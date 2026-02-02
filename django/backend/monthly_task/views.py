from rest_framework import generics, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from single_task.models import SingleTask
from single_task.utils import generate_recurring_tasks_by_date_list

from .models import MonthlyTaskScheduler, MonthlyTaskAppliedQuarterly
from .serializers import MonthlyTaskSchedulerSerializer, MonthlyTaskAppliedQuarterlySerializer
from .utils import (
    get_monthly_scheduling_dates_by_quarter,
)


class MonthlyTaskAppliedQuarterlyViewSet(viewsets.ModelViewSet):
    """
    Handles CRUD operations for MonthlyTaskAppliedQuarterly.
    Applying a monthly task to a quarter creates SingleTask instances for each month.
    """
    permission_classes = (IsAuthenticated,)
    queryset = MonthlyTaskAppliedQuarterly.objects.all()
    serializer_class = MonthlyTaskAppliedQuarterlySerializer
    lookup_field = 'id'

    def create(self, request, *args, **kwargs):
        """Create a quarterly application and generate all SingleTask instances."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            quarter = serializer.validated_data['quarter']
            year = serializer.validated_data['year']
            monthly_task_scheduler = serializer.validated_data['monthly_task_scheduler']

            # Generate list of dates for this quarter (3 dates, one per month)
            quarterly_task_date_list = get_monthly_scheduling_dates_by_quarter(
                year=year,
                quarter=quarter,
                day_of_month=monthly_task_scheduler.day_of_month
            )

            # Save the quarterly application
            serializer.save()

            # Generate and save all SingleTask instances for the quarter
            batch_of_tasks = generate_recurring_tasks_by_date_list(
                task_name=monthly_task_scheduler.monthly_task_name,
                user_profile=monthly_task_scheduler.user_profile,
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
        Delete the quarterly application.
        Note: Does not return obsolete task IDs (simpler than the teacher scheduling app).
        """
        try:
            quarterly_application = self.get_object()
            deleted_id = quarterly_application.id

            # Delete the quarterly application
            quarterly_application.delete()

            return Response({
                "message": "Monthly task application successfully deleted!",
                "id": deleted_id
            })
        except Exception as e:
            return Response(
                {"message": "There was an error. Please try again"},
                status=status.HTTP_400_BAD_REQUEST
            )

    def update(self, request, *args, **kwargs):
        """Disable PUT/PATCH - user must delete and create new."""
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


class MonthlyTaskAppliedQuarterlyListView(generics.ListAPIView):
    """
    Get all monthly tasks applied quarterly for the authenticated user.
    Can be filtered by quarter and year via URL parameters.
    """
    permission_classes = (IsAuthenticated,)
    queryset = MonthlyTaskAppliedQuarterly.objects.all()
    serializer_class = MonthlyTaskAppliedQuarterlySerializer

    def get_queryset(self):
        # Check if filtering by quarter and year
        quarter = self.kwargs.get("quarter")
        year = self.kwargs.get("year")

        if quarter and year:
            queryset = MonthlyTaskAppliedQuarterly.objects.filter(
                monthly_task_scheduler__user_profile__user=self.request.user,
                quarter=quarter,
                year=year
            )
        else:
            # Return all quarterly applications for the user
            queryset = MonthlyTaskAppliedQuarterly.objects.filter(
                monthly_task_scheduler__user_profile__user=self.request.user
            )

        return queryset.order_by(
            '-year', '-quarter',
            'monthly_task_scheduler__day_of_month',
            'monthly_task_scheduler__monthly_task_name'
        )


class MonthlyTaskSchedulerViewSet(viewsets.ModelViewSet):
    """
    Handles CRUD operations for MonthlyTaskScheduler templates.
    """
    permission_classes = (IsAuthenticated,)
    queryset = MonthlyTaskScheduler.objects.all()
    serializer_class = MonthlyTaskSchedulerSerializer
    lookup_field = 'id'

    def create(self, request, *args, **kwargs):
        """Create a new monthly task scheduler."""
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
        """Delete a monthly task scheduler."""
        try:
            instance = self.get_object()
            scheduler_id = instance.id
            self.perform_destroy(instance)
            return Response({
                "id": scheduler_id,
                "message": "Monthly task scheduler successfully deleted!"
            })
        except Exception as e:
            return Response(
                {"message": "Deletion Failed. Item not found"},
                status=status.HTTP_404_NOT_FOUND
            )


class MonthlyTaskSchedulersByUserListView(generics.ListAPIView):
    """
    Get all monthly task schedulers for the authenticated user.
    """
    permission_classes = (IsAuthenticated,)
    queryset = MonthlyTaskScheduler.objects.all()
    serializer_class = MonthlyTaskSchedulerSerializer

    def get_queryset(self):
        queryset = MonthlyTaskScheduler.objects.filter(
            user_profile__user=self.request.user
        )
        return queryset.order_by('day_of_month', 'monthly_task_name')

