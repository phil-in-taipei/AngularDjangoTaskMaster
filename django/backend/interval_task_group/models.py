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


class IntervalTaskGroupManager(models.Manager):
    def user_task_groups(self, user_profile_id):
        """
        Get all interval task groups for a specific user.
        """
        return self.get_queryset().filter(
            task_group_owner_id=user_profile_id
        )


class IntervalTaskGroup(models.Model):
    custom_query = IntervalTaskGroupManager()
    objects = models.Manager()
    
    task_group_name = models.CharField(max_length=255)
    
    interval_in_days = models.IntegerField(
        validators=[MinValueValidator(1)]
    )
    
    task_group_owner = models.ForeignKey(
        UserProfile,
        related_name='interval_task_groups',
        on_delete=models.CASCADE
    )
    
    @property
    def template_selector_string(self):
        """
        Returns a readable string for frontend forms.
        e.g., 'Wipe surfaces (Every 3 days)'
        """
        return "{} (Every {} days)".format(
            self.task_group_name,
            self.interval_in_days
        )
    
    def __str__(self):
        return "{} - Every {} days - {}".format(
            self.task_group_name,
            self.interval_in_days,
            str(self.task_group_owner).title()
        )
    
    class Meta:
        verbose_name_plural = 'Interval Task Groups'
        ordering = ['task_group_owner__user__username', 'task_group_name']


class IntervalTaskScheduler(models.Model):
    """
    Individual tasks within an IntervalTaskGroup.
    These are cycled through when the group is applied to a quarter.
    """
    objects = models.Manager()
    
    interval_task_name = models.CharField(max_length=255)
    
    interval_task_group = models.ForeignKey(
        IntervalTaskGroup,
        related_name='interval_tasks',
        on_delete=models.CASCADE
    )
    
    def __str__(self):
        return "{} ({})".format(
            self.interval_task_name,
            self.interval_task_group.task_group_name
        )
    
    class Meta:
        verbose_name_plural = 'Interval Task Schedulers'
        ordering = ['interval_task_group', 'interval_task_name']


class IntervalTaskGroupAppliedQuarterly(models.Model):
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
    
    interval_task_group = models.ForeignKey(
        IntervalTaskGroup,
        related_name='quarterly_applications',
        on_delete=models.CASCADE
    )
    
    class Meta:
        verbose_name_plural = 'Interval Task Groups Applied Quarterly'
        ordering = [
            '-year',
            '-quarter',
            'interval_task_group__task_group_owner__user__username',
            'interval_task_group__task_group_name'
        ]
        unique_together = ('quarter', 'year', 'interval_task_group',)
    
    @property
    def quarter_string(self):
        """Returns the quarter as a display string."""
        quarter_string = [q[1] for q in QUARTERLY_SCHEDULING
                         if q[0] == self.quarter][0]
        return quarter_string
    
    def __str__(self):
        return "{} {} for {}".format(
            self.quarter_string,
            self.year,
            self.interval_task_group
        )
