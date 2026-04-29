export interface Note {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    count?:number;
    data: T;
}