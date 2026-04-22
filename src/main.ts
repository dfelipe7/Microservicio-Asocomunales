import dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

/**
 * Punto de entrada de la aplicación.
 *
 * Configura el microservicio, habilita CORS, registra cookie-parser,
 * genera documentación Swagger y arranca la aplicación.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar lectura de cookies (necesario para el guard JWT)
  app.use(cookieParser());

  // Conectar microservicio consumidor a la cola de MS2
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
      queue: 'colaJac', // la cola de MS2
      queueOptions: { durable: true },
    },
  });


  // Conectar a la cola de aprobaciones provenientes del MS Auditoría
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
      queue: 'colaAprobacionesAsocomunal',
      queueOptions: { durable: false },
    },
  });

  // Habilitar CORS para aceptar solicitudes del frontend
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  /**
   * Configuración de la documentación Swagger.
   * 
   * @returns Documentación de la API.
   */
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

  /**
   * Inicia todos los microservicios.
   */
  await app.startAllMicroservices();

  /**
   * Inicia la aplicación.
   */
  await app.listen(process.env.PORT ?? 3000);
  console.log('MS1 corriendo y escuchando colaJac');
}
bootstrap();
