from datetime import datetime

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from user_profiles.models import UserProfile

MONDAY = 0
TUESDAY = 1
WEDNESDAY = 2
THURSDAY = 3
FRIDAY = 4
SATURDAY = 5
SUNDAY = 6

DAYS_OF_WEEK_INTEGERS = (
    (MONDAY, 'Monday'),
    (TUESDAY, 'Tuesday'),
    (WEDNESDAY, 'Wednesday'),
    (THURSDAY, 'Thursday'),
    (FRIDAY, 'Friday'),
    (SATURDAY, 'Saturday'),
    (SUNDAY, 'Sunday'),
)

Q1 = 'Q1'
Q2 = 'Q2'
Q3 = 'Q3'
Q4 = 'Q4'

QUARTERLY_SCHEDULING = (
    (Q1, 'Q1'),
    (Q2, 'Q2'),
    (Q3, 'Q3'),
    (Q4, 'Q4'),
)


class WeeklyTaskSchedulerManager(models.Manager):
    def user_schedulers_on_day_of_week(self, query_day_of_week, user_profile_id):
        """
        Get all weekly task schedulers for a user on a specific day of week.
        """
        return self.get_queryset().filter(
            day_of_week=query_day_of_week,
            user_profile_id=user_profile_id
        )


class WeeklyTaskScheduler(models.Model):
    custom_query = WeeklyTaskSchedulerManager()
    objects = models.Manager()

    weekly_task_name = models.CharField(max_length=255)

    day_of_week = models.SmallIntegerField(choices=DAYS_OF_WEEK_INTEGERS)

    user_profile = models.ForeignKey(
        UserProfile,
        related_name='weekly_task_schedulers',
        on_delete=models.CASCADE
    )

    @property
    def day_of_week_string(self):
        """Returns the day of week as a string (e.g., 'Monday')."""
        day_of_week_string = [day[1] for day in DAYS_OF_WEEK_INTEGERS
                              if day[0] == self.day_of_week][0]
        return day_of_week_string

    @property
    def template_selector_string(self):
        """
        Returns a readable string for frontend forms.
        e.g., 'Vacuum living room (every Sunday)'
        """
        return "{} (every {})".format(
            self.weekly_task_name,
            self.day_of_week_string
        )

    def __str__(self):
        return "{} on {} - {}".format(
            self.weekly_task_name,
            self.day_of_week_string,
            str(self.user_profile).title()
        )

    class Meta:
        verbose_name_plural = 'Weekly Task Schedulers'
        ordering = ['user_profile__user__username', 'day_of_week', 'weekly_task_name']


class WeeklyTaskAppliedQuarterly(models.Model):
    quarter = models.CharField(
        max_length=2,
        choices=QUARTERLY_SCHEDULING
    )

    year = models.SmallIntegerField(
        validators=[
            MinValueValidator(2023),
            MaxValueValidator(2035)
        ]
    )

    weekly_task_scheduler = models.ForeignKey(
        WeeklyTaskScheduler,
        related_name='quarterly_applications',
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name_plural = 'Weekly Tasks Applied Quarterly'
        ordering = [
            '-year',
            '-quarter',
            'weekly_task_scheduler__user_profile__user__username',
            'weekly_task_scheduler__weekly_task_name'
        ]
        unique_together = ('quarter', 'year', 'weekly_task_scheduler',)

    @property
    def quarter_string(self):
        """Returns the quarter as a display string."""
        quarter_string = [q[1] for q in QUARTERLY_SCHEDULING
                          if q[0] == self.quarter][0]
        return quarter_string

    @property
    def day_of_week(self):
        """
        Returns the day of week from the related scheduler.
        Used for sorting in frontend state.
        """
        return self.weekly_task_scheduler.day_of_week

    @property
    def weekly_task_name(self):
        """
        Returns the task name from the related scheduler.
        Used for sorting in frontend state.
        """
        return self.weekly_task_scheduler.weekly_task_name

    def __str__(self):
        return "{} {} for {}".format(
            self.quarter_string,
            self.year,
            self.weekly_task_scheduler
        )

