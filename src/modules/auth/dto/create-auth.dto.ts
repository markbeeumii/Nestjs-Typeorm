import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger'

export class CreateAuthDto {
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
}
