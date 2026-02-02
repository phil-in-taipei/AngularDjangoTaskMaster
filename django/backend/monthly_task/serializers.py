from rest_framework import serializers

from .models import MonthlyTaskScheduler, MonthlyTaskAppliedQuarterly


class MonthlyTaskSchedulerSerializer(serializers.ModelSerializer):
    ordinal_suffix = serializers.ReadOnlyField()
    template_selector_string = serializers.ReadOnlyField()

    class Meta:
        model = MonthlyTaskScheduler
        fields = (
            'id', 'monthly_task_name', 'day_of_month',
            'user_profile', 'ordinal_suffix',
            'template_selector_string'
        )


class MonthlyTaskAppliedQuarterlySerializer(serializers.ModelSerializer):
    """
    Lightweight serializer that only includes the scheduler ID.
    The frontend already has all schedulers cached, so we don't need
    to send the full scheduler data with each quarterly application.
    """
    quarter_string = serializers.ReadOnlyField()
    day_of_month = serializers.ReadOnlyField()
    monthly_task_name = serializers.ReadOnlyField()

    # Only include the ID of the related scheduler, not the full object
    monthly_task_scheduler_id = serializers.PrimaryKeyRelatedField(
        queryset=MonthlyTaskScheduler.objects.all(),
        source='monthly_task_scheduler',
        write_only=True
    )

    class Meta:
        model = MonthlyTaskAppliedQuarterly
        fields = (
            'id', 'quarter', 'year',
            'monthly_task_scheduler_id', 'quarter_string',
            'day_of_month', 'monthly_task_name'
        )
        read_only_fields = ('quarter_string', 'day_of_month', 'monthly_task_name')