import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();
dotenv.config();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // REGISTER
  async signup(username: string, email: string, password: string) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    return { message: 'User created', userId: user.id };
  }

  // LOGIN
  async login(email: string, password: string, res: Response) {
    try {
      // Find user by email
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
  
      // Compare password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const { password: storedPassword, ...userInfo } = user;
      
      // Generate JWT token
      const token = this.jwtService.sign({ userId: user.id }, { 
        secret: process.env.JWT_SECRET, 
        expiresIn: '10d',
      });
  
      // Set token in HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 10, // 10 days
      });
  
      // Send response
      return res.status(200).json({ message: 'Login successful', userInfo });
  
    } catch (error) {
      return res.status(error?.status || 500).json({ message: error?.message || "Login failed" });
    }
  }  

 // LOGOUT
async logout(res: Response) {
    try {
      res.clearCookie('token');
      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Logout failed' });
    }
  }
};
  
