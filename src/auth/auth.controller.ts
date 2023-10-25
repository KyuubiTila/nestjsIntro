import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signUp')
  signUp(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.signUpService(authCredentialDto);
  }
  @Get('/allUsers')
  getAllUsers() {
    return this.authService.getAllUserService();
  }
  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.authService.getUserByIdService(id);
  }
  @Delete('/:id')
  deleteUserById(@Param('id') id: number) {
    return this.authService.deleteUserByIdService(id);
  }
  @Put('/:id')
  updateUserById(
    @Param('id') id: number,
    @Body() userUpdateDto: UserUpdateDto, // Use the UserUpdateDto
  ) {
    return this.authService.updateUserByIdService(id, userUpdateDto);
  }
  @Post('/signIn')
  signIn(
    @Body() authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.validateUserPassword(authCredentialDto);
  }
}
