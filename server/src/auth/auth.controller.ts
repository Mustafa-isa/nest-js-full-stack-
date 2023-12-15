// src/auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entity/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('linkedinProfile') linkedinProfile?: string,
  ) {
    const user = await this.authService.register(
      email,
      password,
      linkedinProfile,
    );
    return { message: 'User registered successfully', user };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.login(email, password);
    return result;
  }
}
