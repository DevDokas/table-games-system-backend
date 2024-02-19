import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInterface } from './interfaces/user.interface';
import { LoginInterface } from './interfaces/login.interface';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Post('/register')
  create(@Body() user: UserInterface): void {
    this.userService.create(user);
  }

  @Post('/login')
  async login(@Body() login: LoginInterface) {
    try {
      const token = await this.userService.login(login);
      return {
        status: HttpStatus.ACCEPTED,
        token: token.toString(),
      };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { erro: 'Erro ao fazer login' };
    }
  }
}
