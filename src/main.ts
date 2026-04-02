import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  const config = new DocumentBuilder()

  
    .setTitle('Documentación de la API de Asocomunales')
    .setDescription('Esta es la documentación de la API para el microservicio de Asocomunales, que proporciona información sobre los municipios y sus respectivas asociaciones comunales.')
    .setVersion('1.0')
    .addTag('asocomunales')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, documentFactory);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
