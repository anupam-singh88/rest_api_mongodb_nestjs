import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, UserSchema } from './user/user.schema';
import { JOB_MODEL, JobSchema } from './job';

const MODELS = [
  {
    name: USER_MODEL,
    schema: UserSchema,
  },
  {
    name: JOB_MODEL,
    schema: JobSchema,
  },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class MongooseModelModule {}
