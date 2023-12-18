// src/tasks/task.controller.ts

import { Controller, Post, Get, Param, Patch, Delete, Body, UseGuards, Request, Query } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}


  @Post()
  async createTask(
    @Request() req,
    @Body()
    body: {
      title: string;
      description: string;
      id: number;
      catogrey: 'string';
    },
  ): Promise<any> {
    return this.taskService.createTask(
      body.id,
      body.title,
      body.description,
      body.catogrey,
    );
  }


  @Get()
  async getAllTasks(@Query('userId') userId: string): Promise<any> {
    return this.taskService.getAllTasks(+userId);
  }
  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<any> {
    return this.taskService.getTaskById(+id);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() body: { title: string, description?: string }): Promise<any> {
    return this.taskService.updateTask(+id, body.title, body.description);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<any> {
    await this.taskService.deleteTask(+id);
    return { message: 'Task deleted successfully' };
  }
}
