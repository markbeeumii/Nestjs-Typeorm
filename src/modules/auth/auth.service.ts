import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Hash } from 'src/utils/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
 
  constructor(
    private readonly jwtservice : JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    try {
      const users = await this.userRepository.findOne({
        where: {
          email: createAuthDto.email,
        },
      });
      if (!users) {
        throw new BadRequestException(`User doesn't exist.`);
      } else {
        const verified = Hash.compare(createAuthDto.password, users.password);
        if (!verified) {
          throw new BadRequestException(`Password incorrect.`);
        } else {
          const token = await this.jwtservice.sign(
            { email: users.email },
            {
              secret: String(process.env.APP_SECRET_KEY),
              expiresIn: '2h',
            },
          );
          if (!token) throw new UnauthorizedException(`Unauthorized`);
          return {
            sucess: true,
            token: token,
          };
        }
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /*
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  */
}
