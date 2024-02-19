import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './interfaces/game.interface';
import { Game as GameClass } from './schemas/games.schema';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(GameClass.name) private gameModel: Model<GameClass>
  ) {}

  async create(game: Game): Promise<Game> {
    const createdGame = new this.gameModel(game);

    return await createdGame.save();
  }

  async edit(id: string, body: Game): Promise<Game> {
    console.log(id);
    console.log(body);
    const existingItem = await this.gameModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!existingItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return existingItem;
  }

  async findAll(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }

  async findById(id: string): Promise<Game> {
    return await this.gameModel.findById(id);
  }
}
