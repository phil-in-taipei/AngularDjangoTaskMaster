from django.urls import path
from .views import (
    SingleTaskConfirmCompletionView,
    SingleTaskViewSet,
    SingleTaskByDateView,
    SingleTaskByMonthYearView,
    SingleTaskCurrentMonthView,
    UncompletedPastTasksView
)

app_name = "single_task"

urlpatterns = [
    # Confirm task completion
    path('confirm/<int:id>/',
         SingleTaskConfirmCompletionView.as_view(),
         name='task-confirm-completion'),

    # Create a new task
    path('create/',
         SingleTaskViewSet.as_view({'post': 'create'}),
         name='task-create'),

    # Delete a task
    path('delete/<int:id>/',
         SingleTaskViewSet.as_view({'delete': 'destroy'}),
         name='task-delete'),

    # Reschedule a task
    path('reschedule/<int:id>/',
         SingleTaskViewSet.as_view({'patch': 'partial_update'}),
         name='task-reschedule'),

    # Get tasks by specific date
    path('date/<str:date>/',
         SingleTaskByDateView.as_view(),
         name='task-by-date'),

    # Get tasks by month and year
    path('month-year/<int:month>/<int:year>/',
         SingleTaskByMonthYearView.as_view(),
         name='task-by-month-year'),

    # Get tasks for current month
    path('current-month/',
         SingleTaskCurrentMonthView.as_view(),
         name='task-current-month'),

    # Get uncompleted past tasks
    path('unconfirmed/',
         UncompletedPastTasksView.as_view(),
         name='task-unconfirmed'),
]
