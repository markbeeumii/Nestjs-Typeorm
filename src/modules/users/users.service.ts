import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { CreateUserdto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from 'src/common/guards/Jwtguard';

@Injectable()

export class UsersService {
  //private readonly userRepository :  Repository<UserEntity>
  constructor(
    @InjectRepository(UserEntity) 
    private readonly userRepository : Repository<UserEntity>,
    ){}

  async create(createUserdto: CreateUserdto) {
    //const users = new CreateUserdto(createUserdto)
    //console.log(createUserdto)
   try{
    return await this.userRepository.save(
      this.userRepository.create({...createUserdto})
    );
   }catch(error){
    throw new BadRequestException(error)
   }
  }

  async findAll(): Promise<any> {
    try{
     const queryBuilder = this.userRepository
          .createQueryBuilder('users')
    // console.log('Hello')
     return await queryBuilder.getMany()
    }catch(error){
      throw new BadRequestException(error)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}


