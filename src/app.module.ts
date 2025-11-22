import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './db/ormconfig';
import { UsersModule } from './users/users.module';
import { SubjectModule } from './subjects/subjects.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV || 'development'}` }),
    TypeOrmModule.forRoot(dataSourceOptions
      // {
      //   type: 'mysql',
      //   host: 'localhost',
      //   port: 3306,
      //   username: 'root',
      //   password: 'root',
      //   database: 'calendar',
      //   entities: [User, Subject, Schedule],
        
      //   // autoLoadEntities: true,
      //   synchronize: false,
      //   migrations: [__dirname + '/migration/**/*{.js,.ts}']
      // }

    ),
    UsersModule,
    SubjectModule,
    SchedulesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
