import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';
import { MenuOption as MenuOptionInterface } from '../interfaces/menu-option.interface';

export type GamesDocument = HydratedDocument<Game>;

@Schema()
export class Game extends Document {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  backgroundColor: string;

  @Prop()
  navbarBackgroundColor: string;

  @Prop()
  minPlayers: number;

  @Prop()
  maxPlayers: number;

  @Prop()
  menuOptionsList: MenuOptionInterface[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
