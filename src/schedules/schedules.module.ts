import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class SchedulesModule {}
