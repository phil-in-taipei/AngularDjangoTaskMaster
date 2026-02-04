from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import (
    IntervalTaskGroupAppliedQuarterlyViewSet,
    IntervalTaskGroupAppliedQuarterlyListView,
    IntervalTaskGroupViewSet,
    IntervalTaskSchedulerCreateView,
    IntervalTaskSchedulerDeleteView,
    IntervalTaskGroupsByUserListView
)

app_name = "interval_task_group"

router = DefaultRouter()
router.register(r'group', IntervalTaskGroupViewSet, basename='interval-task-group')
router.register(r'applied-quarterly', IntervalTaskGroupAppliedQuarterlyViewSet, basename='interval-applied-quarterly')

urlpatterns = [
    path('', include(router.urls)),

    # Create an interval task scheduler within a group
    path(
        'create-scheduler/',
        IntervalTaskSchedulerCreateView.as_view(),
        name='interval-task-scheduler-create'
    ),

    # Delete an interval task scheduler from a group
    path(
        'delete-scheduler/<int:interval_task_id>/<int:task_group_id>/',
        IntervalTaskSchedulerDeleteView.as_view(),
        name='interval-task-scheduler-delete'
    ),

    # Get all interval task groups for the authenticated user
    path(
        'groups/',
        IntervalTaskGroupsByUserListView.as_view(),
        name='interval-task-groups-by-user'
    ),

    # Get all quarterly applications for the authenticated user
    path(
        'applied-quarterly/',
        IntervalTaskGroupAppliedQuarterlyListView.as_view(),
        name='interval-task-applied-quarterly-all'
    ),

    # Get quarterly applications filtered by quarter and year
    path(
        'applied-quarterly/<str:quarter>/<int:year>/',
        IntervalTaskGroupAppliedQuarterlyListView.as_view(),
        name='interval-task-applied-quarterly-filtered'
    ),
]
