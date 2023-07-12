//import { configService } from './config';
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { join } from "path";

const configService = new ConfigService()
export const typeormConfig = {
    type: configService.get<string>('DB_TYPE'),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<string>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    maxQueryExecutionTime: 1000,
    //logging: true,
    synchronize: true,
    migrationsRun: false,
    dropSchema: false,
    entities: [join(__dirname, './../**/**.entity{.ts,.js}')],
    subscribers: [join(__dirname, './../**/**.subscriber{.ts,.js}')],
    migrations: [join(__dirname, '../../migrations/{.ts,*.js}')],
    cli: {
      migrationsDir: 'src/migrations',
    },
} 
