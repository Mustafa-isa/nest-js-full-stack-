import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(req: any, body: {
        title: string;
        description: string;
        id: number;
        category: 'string';
    }): Promise<any>;
    getAllTasks(userId: string): Promise<any>;
    getTaskById(id: string): Promise<any>;
    toggleComplete(taskId: number): Promise<boolean>;
    updateTask(taskId: number, userId: number, updateTaskDto: any): Promise<import("./entity/task.entity").Task>;
    deleteTask(taskId: number, userId: number): Promise<boolean>;
}
