import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialDto {
  @IsString({ message: 'Username must be a string' })
  @MinLength(4, {
    message: 'Username is too short, minimum length is 4 characters',
  })
  @MaxLength(20, {
    message: 'Username is too long, maximum length is 20 characters',
  })
  username: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, {
    message: 'Password is too short, minimum length is 8 characters',
  })
  @MaxLength(20, {
    message: 'Password is too long, maximum length is 20 characters',
  })

  // At least one lowercase letter (a-z).
  // At least one uppercase letter (A-Z).
  // At least one digit (0-9).
  // The password must be at least 8 characters long.
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[a-zA-Z\d@#$%^&+=!]{8,}$/ ---- this includes for special sign
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Password is too weak',
  })
  password: string;
}
