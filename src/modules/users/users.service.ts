import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const userSaved = await this.userRepository.save(dto);
    return userSaved;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.userRepository.findOneBy({ email });

    return result;
  }
}
