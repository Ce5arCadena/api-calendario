import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublicRoute } from 'src/auth/public-route-decorator';
import { PayloadJwt } from 'src/utils/decorators/payload-jwt.decorator';
import type { JwtPayload } from 'src/utils/interfaces/jwt-payload.interface';
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicRoute()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/delete')
  remove(@PayloadJwt() payload: JwtPayload) {
    return this.usersService.remove(payload);
  }
}
