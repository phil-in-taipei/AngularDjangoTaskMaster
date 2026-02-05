export interface ApplyIntervalTaskGroupSchedulersModel {
    interval_task_group: number;
    quarter: string;
    year: number;
}

export interface IntervalTaskGroupAppliedQuarterlyModel {
    id: number;
    quarter: string;
    year: number;
    interval_task_group: number;
}

export interface IntervalTaskCreateModel {
    interval_task_group: number;
    interval_task_name: string;
}

export interface IntervalTaskModel {
    id: number;
    interval_task_name: string;
}

export interface IntervalTaskGroupCreateModel {
    task_group_name: string;
    interval_in_days: number;
}

export interface IntervalTaskGroupModel {
    id: number;
    interval_in_days: number;
    task_group_name: string;
    interval_tasks: IntervalTaskModel[];
    template_selector_string: string;
}
