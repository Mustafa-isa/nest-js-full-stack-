// src/tasks/task.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(userId: number, title: string, description: string ,catogrey:string,): Promise<Task> {
    const task = this.taskRepository.create({
      title,
      description,
      userId,
      catogrey,
    });
    return this.taskRepository.save(task);
  }

  async getAllTasks(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { userId } });
  }
  async getTaskById(id: any): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(id: number, title: string, description?: string): Promise<Task> {
    const task = await this.getTaskById(id);
    task.title = title;
    task.description = description;
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.getTaskById(id);
    await this.taskRepository.remove(task);
  }
}
