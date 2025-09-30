import { IsEmail, IsEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsEmpty()
  @IsEmail()
  email: string;

  @IsEmpty()
  @IsString()
  password: string;
}
