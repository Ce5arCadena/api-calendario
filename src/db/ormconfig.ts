import { ConfigModule } from '@nestjs/config';
// import { User } from '../users/entities/user.entity';
import { DataSourceOptions, DataSource } from 'typeorm';
// import { Subject } from '../subjects/entities/subject.entity';
// import { Schedule } from '../schedules/entities/schedule.entity';
import { resolve } from 'path';

ConfigModule.forRoot({
    envFilePath: `.env`
});

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    // bigNumberStrings: true,
    // multipleStatements: true,
    // logging: true,
    // entities: [User, Subject, Schedule],
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // migrations: [__dirname + '/migrations/*{.ts,.js}'],
    migrations: [resolve(__dirname, 'migrations', '/*{.ts,.js}')],
    // migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;


