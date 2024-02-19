import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FateBasicService } from './fate-basic.service';

@Controller('/fate-basic')
export class FateBasicController {
  constructor(private fateBasicService: FateBasicService) {}

  @Post('/create-char')
  create(@Body() body: any) {
    this.fateBasicService.create(body);
  }

  @Get(':user_id')
  getAllByUser(@Param('user_id') user_id: string) {
    return this.fateBasicService.getAllByUser(user_id);
  }

  @Get('/char/:char_id')
  getCharById(@Param('char_id') char_id: string) {
    return this.fateBasicService.getByCharId(char_id);
  }
}
