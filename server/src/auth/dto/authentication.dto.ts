import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class AuthenticationDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsUrl()
  linkedinProfile?: string;

  constructor(partial: Partial<AuthenticationDto>) {
    Object.assign(this, partial);
  }
}
