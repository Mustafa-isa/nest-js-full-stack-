// src/tasks/task.controller.ts

import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards,
  Request,
  Query,
  Put,
} from '@nestjs/common';
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
      category: 'string';
    },
  ): Promise<any> {
    return this.taskService.createTask(
      body.id,
      body.title,
      body.description,
      body.category,
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

  @Put(':taskId/toggle-complete')
  toggleComplete(@Param('taskId') taskId: number) {
    return this.taskService.toggleComplete(taskId);
  }

  @Put(':taskId/:userId')
  updateTask(
    @Param('taskId') taskId: number,
    @Param('userId') userId: number,
    @Body() updateTaskDto,
  ) {
    return this.taskService.updateTask(taskId, userId, updateTaskDto);
  }

  @Delete(':taskId/:userId')
  deleteTask(@Param('taskId') taskId: number, @Param('userId') userId: number) {
    return this.taskService.deleteTask(taskId, userId);
  }
}
