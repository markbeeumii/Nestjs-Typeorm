import { Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  BadRequestException, 
  UseInterceptors, 
  Logger, 
  UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserdto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from 'src/common/guards/Jwtguard';

@Controller({
  path : 'api/users',
  version : '1'
})
@UseGuards(AuthGuard)
export class UsersController {
 // private readonly usersService: UsersService
  constructor(private readonly usersService: UsersService) {
    //this.usersService = new UsersService()
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ type: UserEntity})
  create(@Body() createUserDto: CreateUserdto) {
    try{
      return this.usersService.create(createUserDto)
    }catch(error){
      throw new BadRequestException(error)
    }
  }

  @Get('')
  findAll() {
    try{
      return this.usersService.findAll();
      //new Logger('dd')
    }catch(error){
      throw new BadRequestException(error)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

 /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  */
}
