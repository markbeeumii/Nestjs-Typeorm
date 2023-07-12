import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {makeExecutableSchema} from 'graphql-tools'
import { GqlConfigService } from 'src/graphql/graphql-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import {TypeOrmModule} from '@nestjs/typeorm'
//import { typeormConfig } from 'src/common/configs/config';
import { UsersModule } from 'src/modules/users/users.module';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/modules/base/entities/base.entity';
import DatabaseConfig from 'src/db/typeorm.config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
//import {} from '../modules/././'

// const typeDefs = `
//   type Query {
//     hello: String!
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: () => 'Hello, World!',
//   },
// };



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath: '.env',
      load: [DatabaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory : (configService: ConfigService) =>({
       type: "mysql",
       host : 'localhost',
       port : 3306,
       username: 'root',
       password : '',
       database: 'nest_app',
       maxQueryExecutionTime: 1000,
       synchronize: true,
       autoLoadEntities: true,
       entities: [join(__dirname, './../**/**.entity{.ts,.js}')],
       subscribers: [join(__dirname, './../**/**.subscriber{.ts,.js}')],
       migrations: [join(__dirname, './../../migrations/{.ts,*.js}')],
      }),
      inject: [ConfigService],
      dataSourceFactory: async (options) =>{
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      }
    }),
    // GraphQLModule.forRoot({
    //   driver: ApolloDriver,
    //   debug: false,
    //   sortSchema: true,
    //   //autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   schema: makeExecutableSchema({typeDefs, resolvers}),
    // }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports : [AppService]
})
export class AppModule {}

/*

 type: "mysql",
        host: configService.get<string>('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: '',
        database: configService.get<string>('DB_DATABASE'),
        //maxQueryExecutionTime: 1000,
        // logging: true,
        synchronize: true,
        //migrationsRun: false,
        //dropSchema: false,
        autoLoadEntities: true,
        entities: [UserEntity],
        //subscribers: [join(__dirname, '../**.subscriber{.ts,.js}')],
        //migrations: [join(__dirname, '../migrations/{.ts,*.js}')],


*/