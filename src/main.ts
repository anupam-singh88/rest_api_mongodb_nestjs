import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove any parameters that do not have a matching DTO property
      //   forbidNonWhitelisted: true, // throw an error if there are any non-whitelisted parameters

      transform: true, // automatically transform incoming data to the correct type
    }),
  );
  await app.listen(3000);
}
bootstrap();
