from django.contrib import admin

from .models import IntervalTaskGroup, IntervalTaskScheduler, IntervalTaskGroupAppliedQuarterly

admin.site.register(IntervalTaskGroup)
admin.site.register(IntervalTaskScheduler)
admin.site.register(IntervalTaskGroupAppliedQuarterly)
