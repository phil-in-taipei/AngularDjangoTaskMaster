from rest_framework import serializers

from .models import WeeklyTaskScheduler, WeeklyTaskAppliedQuarterly


class WeeklyTaskSchedulerSerializer(serializers.ModelSerializer):
    day_of_week_string = serializers.ReadOnlyField()
    template_selector_string = serializers.ReadOnlyField()

    class Meta:
        model = WeeklyTaskScheduler
        fields = (
            'id', 'weekly_task_name', 'day_of_week',
            'day_of_week_string',
            'template_selector_string'
        )


class WeeklyTaskAppliedQuarterlySerializer(serializers.ModelSerializer):
    quarter_string = serializers.ReadOnlyField()
    day_of_week = serializers.ReadOnlyField()
    weekly_task_name = serializers.ReadOnlyField()

    class Meta:
        model = WeeklyTaskAppliedQuarterly
        fields = (
            'id', 'quarter', 'year',
            'weekly_task_scheduler', 'quarter_string',
            'day_of_week', 'weekly_task_name'
        )
