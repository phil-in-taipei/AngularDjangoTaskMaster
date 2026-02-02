from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import (
    MonthlyTaskAppliedQuarterlyViewSet,
    MonthlyTaskAppliedQuarterlyListView,
    MonthlyTaskSchedulerViewSet,
    MonthlyTaskSchedulersByUserListView
)

app_name = "monthly_task"

router = DefaultRouter()
router.register(r'scheduler', MonthlyTaskSchedulerViewSet)
router.register(r'applied-quarterly', MonthlyTaskAppliedQuarterlyViewSet)

urlpatterns = [
    path('', include(router.urls)),

    # Get all monthly task schedulers for the authenticated user
    path(
        'schedulers/',
        MonthlyTaskSchedulersByUserListView.as_view(),
        name='monthly-task-schedulers-by-user'
    ),

    # Get all quarterly applications for the authenticated user
    path(
        'applied-quarterly/',
        MonthlyTaskAppliedQuarterlyListView.as_view(),
        name='monthly-task-applied-quarterly-all'
    ),

    # Get quarterly applications filtered by quarter and year
    path(
        'applied-quarterly/<str:quarter>/<int:year>/',
        MonthlyTaskAppliedQuarterlyListView.as_view(),
        name='monthly-task-applied-quarterly-filtered'
    ),
]
