import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: Repository<Task>);
    createTask(userId: number, title: string, description?: string): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: any): Promise<Task>;
    updateTask(id: number, title: string, description?: string): Promise<Task>;
    deleteTask(id: number): Promise<void>;
}
