import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { RolesUser } from 'src/common/enums/roles-user.enum';

export interface registerResponse {
  message: string;
  userData: {
    id: number;
    username: string;
    email: string;
    rol: RolesUser;
  };
}

@Injectable()
export class AuthService {
  constructor(readonly userService: UsersService) {}

  async register(dto: RegisterDto): Promise<registerResponse> {
    const findUser = await this.userService.findByEmail(dto.email);
    if (findUser) throw new BadRequestException('Email already use');

    const hashedPass = bcrypt.hashSync(dto.password, +process.env.HASH_SALT);

    const newUser: CreateUserDto = {
      username: dto.username,
      email: dto.email,
      password_hash: hashedPass,
    };

    const userSaved = await this.userService.create(newUser);

    return {
      message: 'Successfully registered user',
      userData: {
        id: userSaved.id,
        username: userSaved.username,
        email: userSaved.email,
        rol: userSaved.rol,
      },
    };
  }
}
