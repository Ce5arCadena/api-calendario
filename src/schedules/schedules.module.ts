import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { SchedulesService } from './schedules.service';
import { UsersService } from 'src/users/users.service';
import { SchedulesController } from './schedules.controller';
import { Subject } from 'src/subjects/entities/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subject]),
    UsersModule
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class SchedulesModule {}
