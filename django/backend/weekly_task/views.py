from rest_framework import generics, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from single_task.models import SingleTask
from single_task.utils import generate_recurring_tasks_by_date_list

from .models import WeeklyTaskScheduler, WeeklyTaskAppliedQuarterly
from .serializers import WeeklyTaskSchedulerSerializer, WeeklyTaskAppliedQuarterlySerializer
from .utils import (
    get_weekly_scheduling_dates_by_quarter,
)


class WeeklyTaskAppliedQuarterlyViewSet(viewsets.ModelViewSet):
    """
    Handles CRUD operations for WeeklyTaskAppliedQuarterly.
    Applying a weekly task to a quarter creates SingleTask instances for each occurrence.
    """
    permission_classes = (IsAuthenticated,)
    queryset = WeeklyTaskAppliedQuarterly.objects.all()
    serializer_class = WeeklyTaskAppliedQuarterlySerializer
    lookup_field = 'id'

    def create(self, request, *args, **kwargs):
        """Create a quarterly application and generate all SingleTask instances."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            quarter = serializer.validated_data['quarter']
            year = serializer.validated_data['year']
            weekly_task_scheduler = serializer.validated_data['weekly_task_scheduler']

            # Generate list of dates for this quarter
            quarterly_task_date_list = get_weekly_scheduling_dates_by_quarter(
                day_of_week=weekly_task_scheduler.day_of_week,
                year=year,
                quarter=quarter
            )

            # Save the quarterly application
            serializer.save()

            # Generate and save all SingleTask instances for the quarter
            batch_of_tasks = generate_recurring_tasks_by_date_list(
                task_name=weekly_task_scheduler.weekly_task_name,
                user_profile=weekly_task_scheduler.user_profile,
                dates_to_schedule_tasks=quarterly_task_date_list
            )
            SingleTask.objects.bulk_create(batch_of_tasks)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"message": "There was an error. Please try again"},
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        """
        Delete the quarterly application and find obsolete SingleTask instances.
        Returns IDs of tasks that can be deleted.
        """
        try:
            quarterly_application = self.get_object()
            deleted_id = quarterly_application.id
            quarter = quarterly_application.quarter
            year = quarterly_application.year
            weekly_task_scheduler = quarterly_application.weekly_task_scheduler

            # Generate list of dates for this quarter
            quarterly_task_date_list = get_weekly_scheduling_dates_by_quarter(
                day_of_week=weekly_task_scheduler.day_of_week,
                year=year,
                quarter=quarter
            )

            # Find all SingleTask instances that match
            #obsolete_tasks = SingleTask.objects.filter(
            #    user_profile=weekly_task_scheduler.user_profile,
            #    task_name=weekly_task_scheduler.weekly_task_name,
            #    date__in=quarterly_task_date_list
            #)

            #obsolete_task_strings = [str(task) for task in obsolete_tasks]
            #obsolete_task_ids = [task.id for task in obsolete_tasks]

            # Delete the quarterly application
            quarterly_application.delete()

            return Response({
                "message": "Weekly task application successfully deleted!",
                "id": deleted_id,
                #"single_task_batch_deletion_data": {
                #    "obsolete_task_strings": ', '.join(obsolete_task_strings),
                #    "obsolete_task_ids": obsolete_task_ids
                #}
            })
        except Exception as e:
            return Response(
                {"message": "There was an error. Please try again"},
                status=status.HTTP_400_BAD_REQUEST
            )

    def update(self, request, *args, **kwargs):
        """Disable PUT/PATCH - user must delete and create new."""
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


class WeeklyTaskAppliedQuarterlyListView(generics.ListAPIView):
    """
    Get all weekly tasks applied quarterly for the authenticated user.
    Can be filtered by quarter and year via URL parameters.
    """
    permission_classes = (IsAuthenticated,)
    queryset = WeeklyTaskAppliedQuarterly.objects.all()
    serializer_class = WeeklyTaskAppliedQuarterlySerializer

    def get_queryset(self):
        # Check if filtering by quarter and year
        quarter = self.kwargs.get("quarter")
        year = self.kwargs.get("year")

        if quarter and year:
            queryset = WeeklyTaskAppliedQuarterly.objects.filter(
                weekly_task_scheduler__user_profile__user=self.request.user,
                quarter=quarter,
                year=year
            )
        else:
            # Return all quarterly applications for the user
            queryset = WeeklyTaskAppliedQuarterly.objects.filter(
                weekly_task_scheduler__user_profile__user=self.request.user
            )

        return queryset.order_by(
            '-year', '-quarter',
            'weekly_task_scheduler__day_of_week',
            'weekly_task_scheduler__weekly_task_name'
        )


class WeeklyTaskSchedulerViewSet(viewsets.ModelViewSet):
    """
    Handles CRUD operations for WeeklyTaskScheduler templates.
    """
    permission_classes = (IsAuthenticated,)
    queryset = WeeklyTaskScheduler.objects.all()
    serializer_class = WeeklyTaskSchedulerSerializer
    lookup_field = 'id'

    def create(self, request, *args, **kwargs):
        """Create a new weekly task scheduler."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            # Automatically set user_profile from authenticated user
            new_scheduler = serializer.save(
                user_profile=request.user.userprofile
            )
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"message": "There was an error. Please try again"},
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        """Delete a weekly task scheduler."""
        try:
            instance = self.get_object()
            scheduler_id = instance.id
            self.perform_destroy(instance)
            return Response({
                "id": scheduler_id,
                "message": "Weekly task scheduler successfully deleted!"
            })
        except Exception as e:
            return Response(
                {"message": "Deletion Failed. Item not found"},
                status=status.HTTP_404_NOT_FOUND
            )


class WeeklyTaskSchedulersByUserListView(generics.ListAPIView):
    """
    Get all weekly task schedulers for the authenticated user.
    """
    permission_classes = (IsAuthenticated,)
    queryset = WeeklyTaskScheduler.objects.all()
    serializer_class = WeeklyTaskSchedulerSerializer

    def get_queryset(self):
        queryset = WeeklyTaskScheduler.objects.filter(
            user_profile__user=self.request.user
        )
        return queryset.order_by('day_of_week', 'weekly_task_name')
