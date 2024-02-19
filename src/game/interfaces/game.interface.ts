import { MenuOption } from './menu-option.interface';

export interface Game {
  id?: string;
  name: string;
  slug: string;
  backgroundColor: string;
  navbarBackgroundColor: string;
  minPlayers: number;
  maxPlayers: number;
  menuOptionsList: MenuOption[];
}
