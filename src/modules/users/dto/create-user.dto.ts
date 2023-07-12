import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger'

export class CreateUserdto{
  @IsOptional()
  @IsString()
  @ApiProperty()
  username: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ required: true})
  password: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  first_name: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  last_name: string
  
  @IsString()
  @IsOptional()
  @ApiProperty()
  profile_picture: string
}