import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInterface } from './interfaces/user.interface';
import { LoginInterface } from './interfaces/login.interface';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  create(@Body() user: UserInterface): void {
    this.userService.create(user);
  }

  @Post('/login')
  login(@Body() login: LoginInterface) {
    return this.userService.login(login);
  }
}
