import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './interfaces/game.interface';

@Controller('/game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  create(@Body() game: Game): void {
    this.gameService.create(game);
  }

  @Put(':id')
  edit(@Param('id') id: string, @Body() game: Game): void {
    console.log(id);
    console.log(game);
    this.gameService.edit(id, game);
  }

  @Get()
  getAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Game> {
    return this.gameService.findById(id);
  }
}
