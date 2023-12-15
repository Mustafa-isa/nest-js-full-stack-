// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ScrapingService } from './scraping/scrap.service'; // Import ScrapingService
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/auth.entity';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Include ScrapingService in imports
  providers: [AuthService, ScrapingService],
  controllers: [AuthController],
})
export class AuthModule {}
