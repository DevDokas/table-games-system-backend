import { FBAspectsInterface } from './aspects.interface';
import { FBExpertiseInterface } from './expertise.interface';

export interface FateBasicInterface {
  user?: any;

  char_name: string;

  description: string;

  //Pontos de Recarga -> LocalStorage

  //Pontos de Destino -> LocalStorage

  aspects: FBAspectsInterface;

  expertise: FBExpertiseInterface;

  extras: string[];

  stunts: string[];

  //Stress Físico -> LocalStorage

  //Stress Mental -> LocalStorage

  //Consequencia Suave -> LocalStorage

  //Consequencia Suave -> LocalStorage

  //Consequencia Moderada -> LocalStorage

  //Consequencia Severa -> LocalStorage
}
