from rest_framework import generics, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from single_task.models import SingleTask
from .models import (
    IntervalTaskGroup,
    IntervalTaskScheduler,
    IntervalTaskGroupAppliedQuarterly
)
from .serializers import (
    IntervalTaskGroupSerializer,
    #IntervalTaskSchedulerSerializer,
    IntervalTaskGroupAppliedQuarterlySerializer
)
from .utils import (
    get_interval_scheduling_dates_by_quarter,
    generate_task_batch_by_date_list_and_interval_task_list
)


class IntervalTaskGroupAppliedQuarterlyViewSet(viewsets.ModelViewSet):
    """
    Handles CRUD operations for IntervalTaskGroupAppliedQuarterly.
    Applying an interval task group to a quarter creates SingleTask instances
    cycling through the group's tasks at the specified interval.
    """
    permission_classes = (IsAuthenticated,)
    queryset = IntervalTaskGroupAppliedQuarterly.objects.all()
    serializer_class = IntervalTaskGroupAppliedQuarterlySerializer
    lookup_field = 'id'

    def create(self, request, *args, **kwargs):
        """Create a quarterly application and generate all SingleTask instances."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            quarter = serializer.validated_data['quarter']
            year = serializer.validated_data['year']
            interval_task_group = serializer.validated_data['interval_task_group']

            # Generate list of dates for this quarter at the specified interval
            scheduling_dates = get_interval_scheduling_dates_by_quarter(
                interval=interval_task_group.interval_in_days,
                year=year,
                quarter=quarter
            )

            # Save the quarterly application
            serializer.save()

            # Generate and save all SingleTask instances, cycling through interval tasks
            batch_of_tasks = generate_task_batch_by_date_list_and_interval_task_list(
                interval_task_group=interval_task_group,
                scheduling_dates=scheduling_dates
            )
            SingleTask.objects.bulk_create(batch_of_tasks)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"message": "There was an error. Please try again"},
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        """Delete the quarterly application."""
        try:
            quarterly_application = self.get_object()
            deleted_id = quarterly_application.id

            # Delete the quarterly application
            quarterly_application.delete()

            return Response({
                "message": "Interval task group application successfully deleted!",
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


class IntervalTaskGroupAppliedQuarterlyListView(generics.ListAPIView):
    """
    Get all interval task groups applied quarterly for the authenticated user.
    Can be filtered by quarter and year via URL parameters.
    """
    permission_classes = (IsAuthenticated,)
    queryset = IntervalTaskGroupAppliedQuarterly.objects.all()
    serializer_class = IntervalTaskGroupAppliedQuarterlySerializer

    def get_queryset(self):
        # Check if filtering by quarter and year
        quarter = self.kwargs.get("quarter")
        year = self.kwargs.get("year")

        if quarter and year:
            queryset = IntervalTaskGroupAppliedQuarterly.objects.filter(
                interval_task_group__task_group_owner__user=self.request.user,
                quarter=quarter,
                year=year
            )
        else:
            # Return all quarterly applications for the user
            queryset = IntervalTaskGroupAppliedQuarterly.objects.filter(
                interval_task_group__task_group_owner__user=self.request.user
            )

        return queryset.order_by(
            '-year', '-quarter',
            'interval_task_group__task_group_name'
        )


class IntervalTaskGroupViewSet(viewsets.ModelViewSet):
    """
    Handles CRUD operations for IntervalTaskGroup.
    """
    permission_classes = (IsAuthenticated,)
    queryset = IntervalTaskGroup.objects.all()
    serializer_class = IntervalTaskGroupSerializer
    lookup_field = 'id'

    def create(self, request, *args, **kwargs):
        """Create a new interval task group."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            # Automatically set task_group_owner from authenticated user
            new_group = serializer.save(
                task_group_owner=request.user.userprofile
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
        """Delete an interval task group."""
        try:
            instance = self.get_object()
            group_id = instance.id
            self.perform_destroy(instance)
            return Response({
                "id": group_id,
                "message": "Interval task group successfully deleted!"
            })
        except Exception as e:
            return Response(
                {"message": "Deletion Failed. Item not found"},
                status=status.HTTP_404_NOT_FOUND
            )


class IntervalTaskSchedulerCreateView(APIView):
    """
    Create an interval task scheduler within a specific interval task group.
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        """Create a new interval task scheduler and return the updated group."""
        try:
            interval_task_name = request.data.get('interval_task_name')
            interval_task_group_id = request.data.get('interval_task_group')

            # Get the interval task group
            interval_task_group = get_object_or_404(
                IntervalTaskGroup,
                id=interval_task_group_id
            )

            # Create the interval task scheduler
            interval_task_scheduler = IntervalTaskScheduler(
                interval_task_name=interval_task_name,
                interval_task_group=interval_task_group
            )
            interval_task_scheduler.save()

            # Return the updated group with all its tasks
            serializer = IntervalTaskGroupSerializer(interval_task_group)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"message": "There was an error. Please try again"},
                status=status.HTTP_400_BAD_REQUEST
            )


class IntervalTaskSchedulerDeleteView(APIView):
    """
    Delete an interval task scheduler from a specific interval task group.
    """
    permission_classes = (IsAuthenticated,)

    def delete(self, request, *args, **kwargs):
        """Delete an interval task scheduler and return the updated group."""
        try:
            interval_task_id = kwargs.get('interval_task_id')
            task_group_id = kwargs.get('task_group_id')

            # Get the interval task group
            interval_task_group = get_object_or_404(
                IntervalTaskGroup,
                id=task_group_id
            )

            # Get and delete the interval task scheduler
            interval_task_scheduler = get_object_or_404(
                IntervalTaskScheduler,
                id=interval_task_id,
                interval_task_group=interval_task_group
            )
            interval_task_scheduler.delete()

            # Return the updated group
            serializer = IntervalTaskGroupSerializer(interval_task_group)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message": "The interval task group or task does not exist. Please try again"},
                status=status.HTTP_400_BAD_REQUEST
            )


class IntervalTaskGroupsByUserListView(generics.ListAPIView):
    """
    Get all interval task groups for the authenticated user.
    """
    permission_classes = (IsAuthenticated,)
    queryset = IntervalTaskGroup.objects.all()
    serializer_class = IntervalTaskGroupSerializer

    def get_queryset(self):
        queryset = IntervalTaskGroup.objects.filter(
            task_group_owner__user=self.request.user
        )
        return queryset.order_by('task_group_name')
