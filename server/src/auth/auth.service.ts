// src/auth/auth.service.ts

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly jwtSecret = 'yourSecretKey'; // Replace with your actual secret key

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // ... other methods ...
  async register(email: string, password: string, linkedinProfile?: string): Promise<{ token: string }> {
    // Check if the user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new NotFoundException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      linkedinProfile,
    });

    // Save the user to the database
    const user = await this.userRepository.save(newUser);

    // Generate JWT
    const token = this.generateJwtToken(user);

    return { token };
  }
  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const token = this.generateJwtToken(user);

    return { token };
  }

  private generateJwtToken(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' }); // Adjust expiration as needed
  }
}
