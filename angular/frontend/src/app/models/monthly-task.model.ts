export interface ApplyMonthlyTaskSchedulerModel {
    monthly_task_scheduler: number;
    quarter: string;
    year: number;
}

export interface MonthlyTaskAppliedQuarterlyModel {
    id: number;
    quarter: string;
    year: number;
    monthly_task_scheduler: number;
}

export interface MonthlyTaskCreateModel {
    monthly_task_name: string;
    day_of_month: number;
}

export interface MonthlyTaskModel {
    id: number;
    monthly_task_name: string;
    day_of_month: number;
    template_selector_string: string;
}

///applied-quarterly/{quarter}/{year}

///apply-quarterly/{quarter}/{year}

///delete-applied-quarterly/{taskId}