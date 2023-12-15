// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entity/auth.entity'; // Adjust this based on your project structure

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]), // Assuming you have a User entity
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
