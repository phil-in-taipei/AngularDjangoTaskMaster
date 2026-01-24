from django.contrib import admin

from .models import WeeklyTaskScheduler, WeeklyTaskAppliedQuarterly

admin.site.register(WeeklyTaskScheduler)
admin.site.register(WeeklyTaskAppliedQuarterly)
