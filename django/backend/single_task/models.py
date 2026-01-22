from django.db import models
from user_profiles.models import UserProfile

TASK_STATUS = (
    ('pending', 'Pending'),
    ('completed', 'Completed'),
    ('deferred', 'Deferred'),
    ('cancelled', 'Cancelled'),
)


class SingleTaskManager(models.Manager):
    """
    Custom manager for SingleTask model.
    Add custom query methods here as needed.
    """

    def user_tasks_on_date(self, query_date, user_id):
        """
        Get all tasks for a specific user on a specific date.
        """
        return self.get_queryset().filter(
            date=query_date,
            user_id=user_id
        )

    def user_pending_tasks(self, user_id):
        """
        Get all pending tasks for a specific user.
        """
        return self.get_queryset().filter(
            user_id=user_id,
            status='pending'
        )


class SingleTask(models.Model):
    custom_query = SingleTaskManager()
    objects = models.Manager()

    task_name = models.CharField(max_length=255)

    date = models.DateField()

    user_profile = models.ForeignKey(
        UserProfile,
        related_name='single_tasks',
        on_delete=models.CASCADE
    )

    status = models.CharField(
        max_length=50,
        choices=TASK_STATUS,
        default='pending'
    )

    comments = models.TextField(
        editable=True,
        default='',
        blank=True
    )

    created_date_time = models.DateTimeField(auto_now_add=True)

    updated_date_time = models.DateTimeField(auto_now=True)

    # Uncomment if you decide to implement the IntervalTaskGroup relation
    # interval_task_group = models.ForeignKey(
    #     'IntervalTaskGroup',
    #     related_name='single_tasks',
    #     on_delete=models.CASCADE,
    #     null=True,
    #     blank=True
    # )

    def __str__(self):
        return "{} on {} - {} ({})".format(
            self.task_name,
            self.date,
            str(self.user_profile).title(),
            self.get_status_display()
        )

    class Meta:
        verbose_name_plural = 'Single Tasks'
        ordering = ['-date', 'user_profile', 'task_name']