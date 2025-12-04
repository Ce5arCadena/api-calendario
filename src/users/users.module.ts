import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule {}
