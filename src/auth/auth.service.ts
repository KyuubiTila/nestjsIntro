import * as bcrypt from 'bcrypt';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async signUpService(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password);

    try {
      await user.save();
    } catch (error) {
      // duplicate username
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getAllUserService(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserByIdService(id: number): Promise<User> {
    const found = await this.userRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    return found;
  }
  async deleteUserByIdService(id: number): Promise<void> {
    const deleted = await this.userRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(`Task with id of ${id} not found`);
    }
  }

  async updateUserByIdService(
    id: number,
    userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    const { username, password } = userUpdateDto;

    const user = await this.getUserByIdService(id);

    user.username = username;
    user.password = password;
    await user.save();

    return user;
  }

  async validateUserPassword(
    authCredentialDto: AuthCredentialDto,
  ): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    return user.username;
  }
}
