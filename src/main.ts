import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {ValidationPipe} from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {config} from 'dotenv'

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe);
  app.enableCors();
  const options = new DocumentBuilder()
                  .setTitle("Mark")
                  .setDescription(`Hello`)
                  .setVersion("1.0")
                  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(process.env.API_ROOT, app, document);
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
