import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class ClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  state: string;

  @IsOptional()
  @IsPhoneNumber(null)
  contact1: string;
  contact2: string;
}
