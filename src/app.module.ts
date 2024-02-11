/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './game/schemas/games.schema';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
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
    AppService
  ],
})
export class AppModule {

}
