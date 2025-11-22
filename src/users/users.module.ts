import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule {}
