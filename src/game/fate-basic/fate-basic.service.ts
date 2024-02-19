import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FateBasic } from './schemas/fate-basic.schema';
import { FateBasicInterface } from './interfaces/fate-basic.interface';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class FateBasicService {
  constructor(
    @InjectModel(FateBasic.name) private fateBasicModel: Model<FateBasic>
  ) {}

  async create(body: {
    user: User;
    ficha: FateBasicInterface;
  }): Promise<FateBasic> {
    console.log(body.user);
    console.log(body.ficha);

    const createdFateBasic = new this.fateBasicModel({
      ...body.ficha,
      user: body.user._id,
    });

    console.log(createdFateBasic);

    return createdFateBasic.save();
  }

  async getAllByUser(userId: string): Promise<FateBasic[]> {
    return this.fateBasicModel.find({ user: userId }).exec();
  }

  async getByCharId(charId: string): Promise<FateBasic> {
    return this.fateBasicModel.findById(charId);
  }
}
