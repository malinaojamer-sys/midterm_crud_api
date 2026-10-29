import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '@entities/User';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
};

export const AppDataSource = new DataSource(AppDataSourceOptions);