import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    // throw new Error('Method not implemented.');
    const username = this.config.get('DATABASE_USER');
    const password = this.config.get('DATABASE_PASSWORD');
    const host = this.config.get('DATABASE_HOST');
    const port = this.config.get('DATABASE_PORT');
    const db = this.config.get('DATABASE_NAME');
    const isLocal = this.config.get('NODE_ENV') === 'LOCAL';

    const uri = isLocal
      ? `mongodb://localhost:${port}/${db}`
      : `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority`;
    //  console.log('🚀 ~ MongooseConfigService ~ uri:', uri);
    return {
      uri,
    };
  }
}
