import { IsString, IsOptional } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional() // Make this field optional
  username: string;

  @IsString()
  @IsOptional() // Make this field optional
  password: string;
}
