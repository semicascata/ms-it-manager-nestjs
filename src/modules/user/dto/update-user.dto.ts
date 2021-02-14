import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Occupation, Role } from './user.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  username: string;
  firstName: string;
  lastName: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsEnum(Occupation)
  occupation: Occupation;
}
