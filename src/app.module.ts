import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabseModule } from './DatabaseModule/mongoose/database.module';
import { MongooseModelModule } from './MongooseModel/mongoose-model.module';
import { UserModule } from './users/user.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabseModule,
    MongooseModelModule,
    UserModule,
    JobsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
