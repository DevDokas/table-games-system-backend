import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './game/schemas/games.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel('Game') private readonly gameModel: Model<Game>) {}

  getHello(): string {
    return 'Hello World!';
  }

  isMongoConnected(): string {
    const isConnected = this.gameModel.db.readyState === 1;

    let resp: any;

    if (isConnected) {
      resp = 'Você está conectado';
    } else {
      resp = 'Você NÃO está conectado';
    }

    return resp;
  }
}
