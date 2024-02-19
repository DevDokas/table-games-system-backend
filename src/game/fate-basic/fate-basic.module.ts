import { FateBasicService } from './fate-basic.service';
import { FateBasicController } from './fate-basic.controller';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FateBasic, FateBasicSchema } from './schemas/fate-basic.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { PasswordService } from 'src/user/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FateBasic.name,
        schema: FateBasicSchema,
      },
      {
        name: User.name,
        schema: UserSchema, // Assuming you have UserSchema defined
      },
    ]),
  ],
  controllers: [FateBasicController],
  providers: [FateBasicService, UserService, PasswordService],
})
export class FateBasicModule {}
