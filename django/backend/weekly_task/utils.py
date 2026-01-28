from datetime import date, timedelta
from typing import List


def get_first_day_of_week_by_year_and_quarter(
        day_of_week: int, year: int, quarter: str
) -> date:
    """
    Gets the first occurrence of a specific day of the week in a given quarter.

    Args:
        day_of_week: Integer 0-6 (Monday=0, Sunday=6)
        year: The year
        quarter: String 'Q1', 'Q2', 'Q3', or 'Q4'

    Returns:
        The first date of the specified day of week in the quarter
    """
    # Determine the first day of the quarter
    quarter_start_months = {
        'Q1': 1,
        'Q2': 4,
        'Q3': 7,
        'Q4': 10
    }

    start_month = quarter_start_months[quarter]
    first_day_of_quarter = date(year, start_month, 1)

    # Get the day of week for the first day of the quarter (0=Monday, 6=Sunday)
    current_day_of_week = first_day_of_quarter.weekday()

    # Calculate days until the desired day of week
    days_until_target = (day_of_week - current_day_of_week) % 7

    # Get the first occurrence of the target day
    target_date = first_day_of_quarter + timedelta(days=days_until_target)

    # Check if we landed in the previous month/year and adjust if needed
    if quarter == 'Q1':
        if target_date.month == 12 and target_date.year < year:
            target_date = target_date + timedelta(weeks=1)
    elif quarter == 'Q2':
        if target_date.month < 4:
            target_date = target_date + timedelta(weeks=1)
    elif quarter == 'Q3':
        if target_date.month < 7:
            target_date = target_date + timedelta(weeks=1)
    else:  # Q4
        if target_date.month < 10:
            target_date = target_date + timedelta(weeks=1)

    return target_date


def get_weekly_scheduling_dates_by_quarter(
        day_of_week: int, year: int, quarter: str
) -> List[date]:
    """
    Gets all dates for a specific day of the week within a given quarter.

    Args:
        day_of_week: Integer 0-6 (Monday=0, Sunday=6)
        year: The year
        quarter: String 'Q1', 'Q2', 'Q3', or 'Q4'

    Returns:
        List of dates that fall on the specified day of week in the quarter
    """
    dates = []

    # Get the first occurrence of the day in the quarter
    date_in_quarter = get_first_day_of_week_by_year_and_quarter(
        day_of_week, year, quarter
    )

    # Define the end condition for each quarter
    if quarter == 'Q1':
        # Q1: January-March, ends when we hit April (month 4)
        while date_in_quarter.month < 4:
            dates.append(date_in_quarter)
            date_in_quarter = date_in_quarter + timedelta(weeks=1)
    elif quarter == 'Q2':
        # Q2: April-June, ends when we hit July (month 7)
        while date_in_quarter.month < 7:
            dates.append(date_in_quarter)
            date_in_quarter = date_in_quarter + timedelta(weeks=1)
    elif quarter == 'Q3':
        # Q3: July-September, ends when we hit October (month 10)
        while date_in_quarter.month < 10:
            dates.append(date_in_quarter)
            date_in_quarter = date_in_quarter + timedelta(weeks=1)
    else:  # Q4
        # Q4: October-December, ends when we hit next year
        next_year = year + 1
        while date_in_quarter.year < next_year:
            dates.append(date_in_quarter)
            date_in_quarter = date_in_quarter + timedelta(weeks=1)

    return dates
