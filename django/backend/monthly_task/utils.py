from datetime import date
from typing import List


def get_monthly_scheduling_dates_by_quarter(
        year: int, quarter: str, day_of_month: int
) -> List[date]:
    """
    Gets all dates for a specific day of the month within a given quarter.

    Args:
        year: The year
        quarter: String 'Q1', 'Q2', 'Q3', or 'Q4'
        day_of_month: Integer 1-28 representing the day of the month

    Returns:
        List of dates (one per month in the quarter) on the specified day of month
    """
    dates = []

    if quarter == 'Q1':
        # January, February, March
        dates.append(date(year, 1, day_of_month))
        dates.append(date(year, 2, day_of_month))
        dates.append(date(year, 3, day_of_month))
    elif quarter == 'Q2':
        # April, May, June
        dates.append(date(year, 4, day_of_month))
        dates.append(date(year, 5, day_of_month))
        dates.append(date(year, 6, day_of_month))
    elif quarter == 'Q3':
        # July, August, September
        dates.append(date(year, 7, day_of_month))
        dates.append(date(year, 8, day_of_month))
        dates.append(date(year, 9, day_of_month))
    else:  # Q4
        # October, November, December
        dates.append(date(year, 10, day_of_month))
        dates.append(date(year, 11, day_of_month))
        dates.append(date(year, 12, day_of_month))

    return dates
