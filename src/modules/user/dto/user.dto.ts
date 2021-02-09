import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum Role {
  admin = 'admin',
  user = 'user',
}

export enum Occupation {
  leader = 'leader',
  analyst = 'analyst',
  technician = 'technician',
}

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;
  firstName: string;
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password1: string;
  password2: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsEnum(Occupation)
  occupation: Occupation;
}
