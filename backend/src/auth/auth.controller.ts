import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signup(@Body() body) {
    return this.authService.signup(body.username, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body, @Res() res) {
    return this.authService.login(body.email, body.password, res);
  }

  @Post('logout')
  async logout(@Res() res) {
    return this.authService.logout(res);
  }

  @Get('check-auth')
  async checkAuth(@Req() req) {
    return { isAuthenticated: !!req.cookies?.token };
  }
}
