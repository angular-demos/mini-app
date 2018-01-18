export interface ToDoEntity {
    id: number;
    userId: number;
    title: string;
    removing?: boolean;
    completed: boolean;
}
