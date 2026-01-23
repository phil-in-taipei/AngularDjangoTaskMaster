export interface SingleTaskCreateModel {
    task_name: string;
    date: string;
}

export interface SingleTaskModel {
    id: number;
    task_name: string;
    date: string;
    status: string;
    comments: string | null;
    createdDateTime: string;
    updatedDateTime: string;
}

export interface SingleTaskRescheduleModel {
    date: string;
    comments: string;
}