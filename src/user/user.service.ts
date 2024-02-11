import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PasswordService } from './password.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UserInterface } from './interfaces/user.interface';
import { LoginInterface } from './interfaces/login.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  secretKey =
    '0MkLv3Fsb4wK8qt2NgVgPASZI7aeRXCqqzVjjLxYlgi3e8x0qWHbRGoMTsGDwaRGa3SnJAxxSF71KeTwNywCDtldsKFs1kdn';

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserInterface>,
    private readonly passwordService: PasswordService
  ) {}

  async create(user: UserInterface) {
    console.log(user);

    const { login, image, name, password } = user;

    const hashedPassword = await this.passwordService.hashPassword(password);

    const newUSer = new this.userModel({
      name,
      login,
      password: hashedPassword,
      image,
    });

    return newUSer.save();
  }

  async login(loginInfo: LoginInterface) {
    const { login, password } = loginInfo;

    const user = await this.userModel.findOne({ login });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isPasswordValid = await this.passwordService.comparePasswords(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Senha inválida',
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: 'Senha Inválida',
        }
      );
    }

    return this.generateToken(user);
  }

  async generateToken(user: UserInterface): Promise<any> {
    const paylaod = { username: user.name, sub: user._id };
    return jwt.sign(paylaod, this.secretKey, { expiresIn: 30000 });
  }
}
