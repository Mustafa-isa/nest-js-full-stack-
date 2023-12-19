import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: Repository<Task>);
    createTask(userId: number, title: string, description: string, category: string): Promise<Task>;
    getAllTasks(userId: number): Promise<Task[]>;
    getTaskById(id: any): Promise<Task>;
    toggleComplete(taskId: number): Promise<boolean>;
    updateTask(taskId: number, userId: number, updateTaskDto: any): Promise<Task>;
    deleteTask(taskId: number, userId: number): Promise<boolean>;
}
