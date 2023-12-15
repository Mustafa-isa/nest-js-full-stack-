// src/tasks/task.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // Make sure this line is present
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
