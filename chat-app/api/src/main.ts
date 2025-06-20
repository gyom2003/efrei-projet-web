import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Connecte le microservice RMQ à l'app Nest
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:password@localhost:5672'],
      queue: 'chat_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  // Démarre le microservice RMQ
  await app.startAllMicroservices();

  // Démarre le serveur HTTP (GraphQL Playground aussi)
  await app.listen(process.env.PORT ?? 3000);

  console.log(`Server running at http://localhost:${process.env.PORT ?? 3000}/graphql`);
}

bootstrap();
