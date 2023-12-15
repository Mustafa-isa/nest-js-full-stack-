import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(req: any, body: {
        title: string;
        description?: string;
        id: number;
    }): Promise<any>;
    getAllTasks(): Promise<any>;
    getTaskById(id: string): Promise<any>;
    updateTask(id: string, body: {
        title: string;
        description?: string;
    }): Promise<any>;
    deleteTask(id: string): Promise<any>;
}
