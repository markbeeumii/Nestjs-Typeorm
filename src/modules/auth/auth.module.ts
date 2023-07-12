import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports : [AuthService,PassportModule],
  imports :[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
     secret: process.env.APP_SECRET_KEY,
     signOptions: {expiresIn : '2h'}
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ]
})
export class AuthModule {}
