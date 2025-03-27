import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      req.user = jwt.verify(token, 'your_secret_key');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
}
