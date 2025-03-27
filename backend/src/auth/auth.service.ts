import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signup(username:string, email: string, password: string,) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username,email, password: hashedPassword },
    });
    return { message: 'User created', userId: user.id };
  }

  async login(email: string, password: string, res) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.id });
    res.cookie('token', token, { httpOnly: true });

    return { message: 'Login successful' };
  }

  async logout(res) {
    res.clearCookie('token');
    return { message: 'Logged out successfully' };
  }
}
