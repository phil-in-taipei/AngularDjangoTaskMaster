from rest_framework import serializers
from .models import SingleTask


class SingleTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SingleTask
        fields = (
            'id', 'task_name', 'date',
            'status', 'comments',
            'created_date_time', 'updated_date_time'
        ) #'user',
        read_only_fields = ('created_date_time', 'updated_date_time')
