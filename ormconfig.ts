import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import dotenv from 'dotenv'
import {join} from 'path'
import { DataSource } from 'typeorm'
dotenv.config()

export const dataSource  = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [join(__dirname , '/src/migrations/*{.ts,.js}')],
  entities: [join(__dirname , '/src/**/*.entity.{ts,js}')],
  subscribers: [join(__dirname ,'/src/**/*.subscriber.{ts,js}')],
  synchronize: true,
})

