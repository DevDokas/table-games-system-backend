import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Document } from 'mongoose';
import { FBExpertiseInterface } from '../interfaces/expertise.interface';
import { FBAspectsInterface } from '../interfaces/aspects.interface';
import { User } from 'src/user/schemas/user.schema';

export type FateBasicDocument = HydratedDocument<FateBasic>;

@Schema()
export class FateBasic extends Document {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' }) // Corrigindo para SchemaTypes.ObjectId
  user: User;

  @Prop()
  char_name: string;

  @Prop()
  description: string;

  //Pontos de Recarga -> LocalStorage

  //Pontos de Destino -> LocalStorage

  @Prop({ type: SchemaTypes.Mixed })
  aspects: FBAspectsInterface;

  @Prop({ type: SchemaTypes.Mixed })
  expertise: FBExpertiseInterface;

  @Prop()
  extras: string[];

  @Prop()
  stunts: string[];

  //Stress Físico -> LocalStorage

  //Stress Mental -> LocalStorage

  //Consequencia Suave -> LocalStorage

  //Consequencia Suave -> LocalStorage

  //Consequencia Moderada -> LocalStorage

  //Consequencia Severa -> LocalStorage
}

export const FateBasicSchema = SchemaFactory.createForClass(FateBasic);
