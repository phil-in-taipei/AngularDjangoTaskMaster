from rest_framework import serializers

from .models import IntervalTaskGroup, IntervalTaskScheduler, IntervalTaskGroupAppliedQuarterly


class IntervalTaskGroupSerializer(serializers.ModelSerializer):
    template_selector_string = serializers.ReadOnlyField()
    
    class Meta:
        model = IntervalTaskGroup
        fields = (
            'id', 'task_group_name', 'interval_in_days',
            'template_selector_string'
        )


class IntervalTaskSchedulerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = IntervalTaskScheduler
        fields = (
            'id', 'interval_task_name', 'interval_task_group'
        )


class IntervalTaskGroupAppliedQuarterlySerializer(serializers.ModelSerializer):
    """
    Lightweight serializer that only includes the task group ID.
    The frontend already has all task groups cached, so we don't need
    to send the full task group data with each quarterly application.
    """
    
    class Meta:
        model = IntervalTaskGroupAppliedQuarterly
        fields = (
            'id', 'quarter', 'year',
            'interval_task_group'
        )
