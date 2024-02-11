import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MenuOption extends Document {
  @Prop()
  name: string;
}

export const MenuOptionSchema = SchemaFactory.createForClass(MenuOption);
