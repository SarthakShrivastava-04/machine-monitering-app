import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from './auth/auth.middleware';
import { MachinesModule } from './machines/machines.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MachinesModule, AuthModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('machines');
  }
}
