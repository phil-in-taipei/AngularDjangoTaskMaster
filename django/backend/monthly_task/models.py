from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from user_profiles.models import UserProfile

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


class MonthlyTaskSchedulerManager(models.Manager):
    def user_schedulers_on_day_of_month(self, query_day_of_month, user_profile_id):
        """
        Get all monthly task schedulers for a user on a specific day of month.
        """
        return self.get_queryset().filter(
            day_of_month=query_day_of_month,
            user_profile_id=user_profile_id
        )


class MonthlyTaskScheduler(models.Model):
    custom_query = MonthlyTaskSchedulerManager()
    objects = models.Manager()

    monthly_task_name = models.CharField(max_length=255)

    day_of_month = models.SmallIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(28)
        ]
    )

    user_profile = models.ForeignKey(
        UserProfile,
        related_name='monthly_task_schedulers',
        on_delete=models.CASCADE
    )

    @property
    def ordinal_suffix(self):
        """Returns the ordinal suffix for the day (st, nd, rd, th)."""
        if self.day_of_month in [1, 21]:
            return 'st'
        elif self.day_of_month in [2, 22]:
            return 'nd'
        elif self.day_of_month in [3, 23]:
            return 'rd'
        else:
            return 'th'

    @property
    def template_selector_string(self):
        """
        Returns a readable string for frontend forms.
        e.g., 'Pay rent: 1st day of month'
        """
        return "{}: {}{} day of month".format(
            self.monthly_task_name,
            self.day_of_month,
            self.ordinal_suffix
        )

    def __str__(self):
        return "{} on {}{} - {}".format(
            self.monthly_task_name,
            self.day_of_month,
            self.ordinal_suffix,
            str(self.user_profile).title()
        )

    class Meta:
        verbose_name_plural = 'Monthly Task Schedulers'
        ordering = ['user_profile__user__username', 'day_of_month', 'monthly_task_name']


class MonthlyTaskAppliedQuarterly(models.Model):
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

    monthly_task_scheduler = models.ForeignKey(
        MonthlyTaskScheduler,
        related_name='quarterly_applications',
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name_plural = 'Monthly Tasks Applied Quarterly'
        ordering = [
            '-year',
            '-quarter',
            'monthly_task_scheduler__user_profile__user__username',
            'monthly_task_scheduler__monthly_task_name'
        ]
        unique_together = ('quarter', 'year', 'monthly_task_scheduler',)

    @property
    def quarter_string(self):
        """Returns the quarter as a display string."""
        quarter_string = [q[1] for q in QUARTERLY_SCHEDULING
                          if q[0] == self.quarter][0]
        return quarter_string

    @property
    def day_of_month(self):
        """
        Returns the day of month from the related scheduler.
        Used for sorting in frontend state.
        """
        return self.monthly_task_scheduler.day_of_month

    @property
    def monthly_task_name(self):
        """
        Returns the task name from the related scheduler.
        Used for sorting in frontend state.
        """
        return self.monthly_task_scheduler.monthly_task_name

    def __str__(self):
        return "{} {} for {}".format(
            self.quarter_string,
            self.year,
            self.monthly_task_scheduler
        )

