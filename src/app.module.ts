import { FateBasicModule } from './game/fate-basic/fate-basic.module';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './game/schemas/games.schema';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { WebsocketGateway } from './gateways/websocket/websocket.gateway';
import { FatebasicGateway } from './gateways/fatebasic/fatebasic.gateway';

@Module({
  imports: [
    FateBasicModule,
    MongooseModule.forRoot('mongodb+srv://iguinhogms:18hLmMQSP7oon3h7@cluster0.i8zewad.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature(
      [
        {
          name: Game.name,
          schema: GameSchema
        }
      ]
    ),
    UserModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    FatebasicGateway,
    WebsocketGateway,
  ],
})
export class AppModule {

}
