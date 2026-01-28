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
    day_of_week: string;
}

export interface WeeklyTaskModel {
    id: number;
    weekly_task_name: string;
    day_of_week: string;
    template_selector_string: string;
}
