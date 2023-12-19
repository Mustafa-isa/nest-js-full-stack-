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

  async createTask(
    userId: number,
    title: string,
    description: string,
    category: string,
  ): Promise<Task> {
    const task = this.taskRepository.create({
      title,
      description,
      userId,
      category,
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
  async toggleComplete(taskId: number) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId }, // Specify 'where' for conditions
    });

    if (task) {
      task.complete = !task.complete;
      await this.taskRepository.save(task);
      return true;
    } else {
      // Task not found or not associated with the provided userId
      throw new NotFoundException(
        `Task with ID ${taskId} not found for User with ID `,
      );
    }
  }

  async updateTask(taskId: number, userId: number, updateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new NotFoundException(
        `Task with ID ${taskId} not found for User with ID ${userId}`,
      );
    }

    // Update task properties based on the provided DTO
    Object.assign(task, updateTaskDto);

    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(taskId: number, userId: number) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new NotFoundException(
        `Task with ID ${taskId} not found for User with ID ${userId}`,
      );
    }

    await this.taskRepository.remove(task);
    return true;
  }
}
