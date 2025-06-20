import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // ➤ Crée d'abord l'application HTTP (avec GraphQL)
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // ➤ Connecte ensuite le microservice RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:password@localhost:5672'],
      queue: 'message_send',
      queueOptions: {
        durable: false,
      },
    },
  });

  // ➤ Lance les deux
  await app.startAllMicroservices();
  await app.listen(3000);

  console.log(`🚀 HTTP server ready at http://localhost:3000/graphql`);
}
bootstrap();
