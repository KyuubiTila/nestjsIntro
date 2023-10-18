import { AuthCredentialDto } from './dto/auth-credential.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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

  async signUpService(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = new User();
    user.username = username;
    user.password = password;

    try {
      await user.save();
    } catch (error) {
      // duplicate username
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('username already exist');
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
}
