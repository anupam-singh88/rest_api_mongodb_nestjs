import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { MongooseModelModule } from 'src/MongooseModel/mongoose-model.module';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
