import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Conectar microservicio consumidor a la cola de MS2
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'colaJac', // 👈 la cola de MS2
      queueOptions: { durable: true },
    },
  });

  // Habilitar CORS para aceptar solicitudes del frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Puerto donde corre Vite en desarrollo
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });
  const config = new DocumentBuilder()

    .setTitle('Documentación de la API de Asocomunales')
    .setDescription(
      'Esta es la documentación de la API para el microservicio de Asocomunales, que proporciona información sobre los municipios y sus respectivas asociaciones comunales.',
    )
    .setVersion('1.0')
    .addTag('asocomunales')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, documentFactory);

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000);
  console.log('MS1 corriendo y escuchando colaJac');
}
bootstrap();
