import datetime

from django.shortcuts import get_object_or_404
from rest_framework import generics, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SingleTask
from .serializers import SingleTaskSerializer


class SingleTaskConfirmCompletionView(APIView):
    """
    Endpoint to confirm task completion.
    POST /api/single-task/confirm/<id>/
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        task_id = kwargs.get('id')
        task = get_object_or_404(SingleTask, id=task_id)
        
        try:
            task.status = 'completed'
            task.save()
            serializer = SingleTaskSerializer(task)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message": "There was an error. Please try again"},
                status=status.HTTP_400_BAD_REQUEST
            )


class SingleTaskViewSet(viewsets.ModelViewSet):
    """
    Standard CRUD operations for SingleTask.
    POST /api/task/create/
    DELETE /api/task/delete/<id>/
    PATCH /api/task/reschedule/<id>/
    """
    permission_classes = (IsAuthenticated,)
    queryset = SingleTask.objects.all()
    serializer_class = SingleTaskSerializer
    lookup_field = 'id'

    def create(self, request, *args, **kwargs):
        """Create a new task and return all tasks on the same date."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            # Pass user_profile to save method
            new_task = serializer.save(user_profile=request.user.userprofile)

            # Get all tasks for this user on the same date
            tasks_on_date = SingleTask.objects.filter(
                user_profile=new_task.user_profile,
                date=new_task.date
            ).order_by('id')

            serialized_data = SingleTaskSerializer(tasks_on_date, many=True).data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"message": "There was an error. Please try again"},
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        """Delete a task and return confirmation."""
        instance = self.get_object()
        task_id = instance.id

        try:
            self.perform_destroy(instance)
            return Response(
                {
                    "id": task_id,
                    "message": "Task successfully deleted!"
                },
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"message": "Deletion Failed. Item not found"},
                status=status.HTTP_404_NOT_FOUND
            )

    def partial_update(self, request, *args, **kwargs):
        """Reschedule a task (updates date, status to deferred, and comments)."""
        instance = self.get_object()

        try:
            # Update the task fields
            if 'date' in request.data:
                instance.date = request.data['date']
            if 'comments' in request.data:
                instance.comments = request.data['comments']

            # Set status to deferred when rescheduling
            instance.status = 'deferred'
            instance.save()

            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message": "There was an error. Please try again"},
                status=status.HTTP_400_BAD_REQUEST
            )


class SingleTaskByDateView(generics.ListAPIView):
    """
    Get all tasks for the authenticated user on a specific date.
    GET /api/task/date/<date>/
    """
    permission_classes = (IsAuthenticated,)
    queryset = SingleTask.objects.all()
    serializer_class = SingleTaskSerializer

    def get_queryset(self):
        date_str = self.kwargs.get("date")
        date_list = date_str.split('-')
        query_date = datetime.date(int(date_list[0]), int(date_list[1]), int(date_list[2]))

        try:
            queryset = SingleTask.objects.filter(
                date=query_date,
                user_profile__user=self.request.user
            ).order_by('id')
            return queryset
        except Exception as e:
            return SingleTask.objects.none()


class SingleTaskByMonthYearView(generics.ListAPIView):
    """
    Get all tasks for the authenticated user in a specific month and year.
    GET /api/task/month-year/<month>/<year>/
    """
    permission_classes = (IsAuthenticated,)
    queryset = SingleTask.objects.all()
    serializer_class = SingleTaskSerializer

    def get_queryset(self):
        month = int(self.kwargs.get("month"))
        year = int(self.kwargs.get("year"))

        try:
            start_date = datetime.date(year, month, 1)
            if month == 12:
                finish_date = datetime.date(year + 1, 1, 1)
            else:
                finish_date = datetime.date(year, month + 1, 1)

            queryset = SingleTask.objects.filter(
                date__gte=start_date,
                date__lt=finish_date,
                user_profile__user=self.request.user
            ).order_by('date')
            return queryset
        except Exception as e:
            return SingleTask.objects.none()


class SingleTaskCurrentMonthView(generics.ListAPIView):
    """
    Get all tasks for the authenticated user in the current month.
    GET /api/task/current-month/
    """
    permission_classes = (IsAuthenticated,)
    queryset = SingleTask.objects.all()
    serializer_class = SingleTaskSerializer

    def get_queryset(self):
        today = datetime.date.today()
        start_date = today.replace(day=1)

        try:
            if today.month == 12:
                finish_date = datetime.date(today.year + 1, 1, 1)
            else:
                finish_date = datetime.date(today.year, today.month + 1, 1)

            queryset = SingleTask.objects.filter(
                date__gte=start_date,
                date__lt=finish_date,
                user_profile__user=self.request.user
            ).order_by('date')
            return queryset
        except Exception as e:
            return SingleTask.objects.none()


class UncompletedPastTasksView(generics.ListAPIView):
    """
    Get all uncompleted tasks before today for the authenticated user.
    GET /api/task/unconfirmed/
    """
    permission_classes = (IsAuthenticated,)
    queryset = SingleTask.objects.all()
    serializer_class = SingleTaskSerializer

    def get_queryset(self):
        today = datetime.date.today()

        try:
            queryset = SingleTask.objects.filter(
                user_profile__user=self.request.user,
                date__lt=today
            ).exclude(status='completed').order_by('date')
            return queryset
        except Exception as e:
            return SingleTask.objects.none()
