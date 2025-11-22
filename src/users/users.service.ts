import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface UserResponseInterface {
  ok: boolean;
  data?: User
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseDto> {
    try {
      const emailExist = await this.userRepository.findOneBy({ email: createUserDto.email.trim() });
      if (emailExist) {
        return {
          message: 'El correo ya está en uso',
          icon: 'error',
          ok: false,
          data: {}
        }
      };

      const hashPassword = await bcrypt.hash(createUserDto.password, 12);

      const newUser = await this.userRepository.save({...createUserDto, password: hashPassword});
      const userWithoutPassword = plainToInstance(UserResponseDto, newUser);

      return {
        message: 'El usuario fue creado',
        icon: 'success',
        ok: true,
        data: userWithoutPassword
      }
    } catch (error) {
      throw new HttpException({message: 'Error al crear el usuario', icon: 'error', ok: false, status: HttpStatus.INTERNAL_SERVER_ERROR }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByEmail(email: string): Promise<UserResponseInterface>  {
    try {
      if (!email) {
        return {
          ok: false
        }
      }

      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        return {
          ok: false
        }
      }

      return {
        ok: true,
        data: user
      } 
    } catch (error) {
      throw new HttpException({message: 'Error al consultar el usuario', icon: 'error', ok: false, status: HttpStatus.INTERNAL_SERVER_ERROR }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        return {
          message: 'Usuario no encontrado.',
          icon: 'error',
          ok: false,
          data: []
        }
      }

      const formatUser = plainToInstance(UserResponseDto, user);

      return {
        message: 'Datos listados',
        icon: 'success',
        ok: true,
        data: formatUser
      }
    } catch (error) {
      throw new HttpException({message: 'Error al consultar el usuario', icon: 'error', ok: false, status: HttpStatus.INTERNAL_SERVER_ERROR }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseDto> {
    try {
      if (Object.keys(updateUserDto).length <= 0) {
        return {
          message: 'Debe enviar al menos un campo.',
          icon: 'error',
          ok: false,
          data: []
        }
      }

      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        return {
          message: 'Usuario no encontrado.',
          icon: 'error',
          ok: false,
          data: []
        }
      }

      if (updateUserDto.email) {
        const userByEmail = await this.userRepository.findOneBy({email: updateUserDto.email});
        if (userByEmail && userByEmail.id !== user.id) {
          return {
            message: 'El correo ya está registrado',
            icon: 'error',
            ok: false,
            data: []
          }
        }
        user.email = updateUserDto.email.trim()
      }
        
      if (updateUserDto.username) user.username = updateUserDto.username.trim();

      if (updateUserDto.password) {
        const hashPassword = await bcrypt.hash(updateUserDto.password, 12);
        user.password = hashPassword;
      };

      const userUpdate = await this.userRepository.save(user);
      const userFormat = plainToInstance(UserResponseDto, userUpdate);

      return {
        message: 'Usuario actualizado',
        icon: 'success',
        ok: true,
        data: userFormat
      }
    } catch (error) {
      throw new HttpException({message: 'Error al actualizar el usuario', icon: 'error', ok: false, status: HttpStatus.INTERNAL_SERVER_ERROR }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
