import { resolve } from 'path';
import { ConfigModule } from '@nestjs/config';
import { DataSourceOptions, DataSource } from 'typeorm';

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
    synchronize: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [resolve(__dirname, 'migrations/*{.ts,.js}')],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;


