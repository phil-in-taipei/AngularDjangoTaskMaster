from django.contrib import admin

from .models import MonthlyTaskScheduler, MonthlyTaskAppliedQuarterly

admin.site.register(MonthlyTaskScheduler)
admin.site.register(MonthlyTaskAppliedQuarterly)
