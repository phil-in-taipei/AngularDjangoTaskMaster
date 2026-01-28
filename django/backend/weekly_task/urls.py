from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import (
    WeeklyTaskAppliedQuarterlyViewSet,
    WeeklyTaskAppliedQuarterlyListView,
    WeeklyTaskSchedulerViewSet,
    WeeklyTaskSchedulersByUserListView
)

app_name = "weekly_task"

router = DefaultRouter()
router.register(r'scheduler', WeeklyTaskSchedulerViewSet)
router.register(r'applied-quarterly', WeeklyTaskAppliedQuarterlyViewSet)

urlpatterns = [
    path('', include(router.urls)),

    # Get all weekly task schedulers for the authenticated user
    path(
        'schedulers/',
        WeeklyTaskSchedulersByUserListView.as_view(),
        name='weekly-task-schedulers-by-user'
    ),

    # Get all quarterly applications for the authenticated user
    path(
        'applied-quarterly/',
        WeeklyTaskAppliedQuarterlyListView.as_view(),
        name='weekly-task-applied-quarterly-all'
    ),

    # Get quarterly applications filtered by quarter and year
    path(
        'applied-quarterly/<str:quarter>/<int:year>/',
        WeeklyTaskAppliedQuarterlyListView.as_view(),
        name='weekly-task-applied-quarterly-filtered'
    ),
]