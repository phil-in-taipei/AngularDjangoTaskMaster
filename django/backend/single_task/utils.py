from datetime import date
from typing import List

from .models import SingleTask


def generate_recurring_tasks_by_date_list(
        task_name: str, user_profile, dates_to_schedule_tasks: List[date]
) -> List[SingleTask]:
    """
    Generates a batch of SingleTask instances with the same task name on multiple dates.

    Args:
        task_name: The name of the task to create
        user_profile: The UserProfile instance to associate with the tasks
        dates_to_schedule_tasks: List of dates on which to schedule the task

    Returns:
        List of SingleTask instances (not yet saved to database)
    """
    batch_of_tasks = []

    for task_date in dates_to_schedule_tasks:
        task = SingleTask(
            task_name=task_name,
            date=task_date,
            user_profile=user_profile,
            status='pending'  # Default status from the model
        )
        batch_of_tasks.append(task)

    return batch_of_tasks

