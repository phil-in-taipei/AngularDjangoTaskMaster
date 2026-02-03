from datetime import date, timedelta
from typing import List
import random

from single_task.models import SingleTask
from weekly_task.utils import get_first_day_of_week_by_year_and_quarter


def get_first_date_for_interval_task_by_year_and_quarter(
        interval: int, year: int, quarter: str
) -> date:
    """
    Gets a random starting date within the first week of a quarter for interval tasks.
    
    If interval is 7 or less, picks a random day from days 0 to interval-1.
    If interval is greater than 7, picks any random day from 0-6.
    
    Args:
        interval: The number of days between task occurrences
        year: The year
        quarter: String 'Q1', 'Q2', 'Q3', or 'Q4'
    
    Returns:
        A random date within the first week of the quarter
    """
    # Days of the week: 0=Monday through 6=Sunday
    # Reorder to match Java's array: Sunday=0, Monday=1, etc.
    possible_days_to_begin = [6, 0, 1, 2, 3, 4, 5]  # [Sunday, Monday, ..., Saturday]
    
    # Determine the range for random selection
    daily_index = interval if interval <= 7 else 7
    
    # Pick a random index
    random_index = random.randint(0, daily_index - 1)
    
    # Get the corresponding day of week (in Python's 0=Monday format)
    beginning_day_of_week = possible_days_to_begin[random_index]
    
    # Use the existing function to get the first occurrence of that day in the quarter
    return get_first_day_of_week_by_year_and_quarter(
        beginning_day_of_week, year, quarter
    )


def get_interval_scheduling_dates_by_quarter(
        interval: int, year: int, quarter: str
) -> List[date]:
    """
    Gets all dates for interval task scheduling within a given quarter.
    
    Starts with a random date in the first week of the quarter,
    then adds dates at the specified interval throughout the quarter.
    
    Args:
        interval: The number of days between task occurrences
        year: The year
        quarter: String 'Q1', 'Q2', 'Q3', or 'Q4'
    
    Returns:
        List of dates separated by the specified interval
    """
    dates = []
    
    # Get the randomly generated starting date
    date_in_quarter = get_first_date_for_interval_task_by_year_and_quarter(
        interval, year, quarter
    )
    
    if quarter == 'Q1':
        # Q1: January-March, ends when we hit April (month 4)
        while date_in_quarter.month < 4:
            dates.append(date_in_quarter)
            date_in_quarter = date_in_quarter + timedelta(days=interval)
    elif quarter == 'Q2':
        # Q2: April-June, ends when we hit July (month 7)
        while date_in_quarter.month < 7:
            dates.append(date_in_quarter)
            date_in_quarter = date_in_quarter + timedelta(days=interval)
    elif quarter == 'Q3':
        # Q3: July-September, ends when we hit October (month 10)
        while date_in_quarter.month < 10:
            dates.append(date_in_quarter)
            date_in_quarter = date_in_quarter + timedelta(days=interval)
    else:  # Q4
        # Q4: October-December, ends when we hit next year
        next_year = year + 1
        while date_in_quarter.year < next_year:
            dates.append(date_in_quarter)
            date_in_quarter = date_in_quarter + timedelta(days=interval)
    
    return dates


def generate_task_batch_by_date_list_and_interval_task_list(
        interval_task_group, scheduling_dates: List[date]
) -> List[SingleTask]:
    """
    Generates a batch of SingleTask instances by cycling through interval tasks.
    
    For each date, assigns the next task in the interval task group's task list,
    cycling back to the first task when the end of the list is reached.
    
    Args:
        interval_task_group: IntervalTaskGroup instance with related interval_tasks
        scheduling_dates: List of dates on which to schedule tasks
    
    Returns:
        List of SingleTask instances (not yet saved to database)
    """
    # Get the list of interval tasks in this group
    interval_tasks = list(interval_task_group.interval_tasks.all())
    length_of_interval_tasks = len(interval_tasks)
    
    # Track the last index to know when to reset
    last_index_in_interval_task_list = length_of_interval_tasks - 1
    
    batch_of_tasks = []
    index_of_interval_task_list = 0
    
    for task_date in scheduling_dates:
        # Get the current interval task
        interval_task = interval_tasks[index_of_interval_task_list]
        
        # Create a SingleTask with this interval task's name
        single_task = SingleTask(
            task_name=interval_task.interval_task_name,
            date=task_date,
            user_profile=interval_task_group.task_group_owner,
            status='pending'
        )
        
        batch_of_tasks.append(single_task)
        
        # Cycle through the interval task list
        if index_of_interval_task_list == last_index_in_interval_task_list:
            # End of the list reached, reset to zero
            index_of_interval_task_list = 0
        else:
            index_of_interval_task_list += 1
    
    return batch_of_tasks
