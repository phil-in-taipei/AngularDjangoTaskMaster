export interface ApplyWeeklyTaskSchedulerModel {
    weekly_task_scheduler: number;
    quarter: string;
    year: number;
}

export interface WeeklyTaskAppliedQuarterlyModel {
    id: number;
    quarter: string;
    year: number;
    weekly_task_scheduler: number;
}


export interface WeeklyTaskCreateModel {
    weekly_task_name: string;
    day_of_week: number;
}

export interface WeeklyTaskModel {
    id: number;
    weekly_task_name: string;
    day_of_week: number;
    day_of_week_string: string;
    template_selector_string: string;
}
