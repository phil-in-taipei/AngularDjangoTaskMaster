from django.contrib import admin
from rangefilter.filters import DateRangeFilter
from .models import SingleTask


class SingleTaskAdmin(admin.ModelAdmin):
    list_display = ('user_profile', 'date', 'task_name',
                    'status', 'updated_date_time',)
    list_filter = (
        ('date', DateRangeFilter),
    )
    search_fields = [
        'task_name', 'user_profile__user__username'
    ]


admin.site.register(SingleTask, SingleTaskAdmin)