import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const frontendOrigin = configService.get<string>('FRONTEND_URL');

  app.enableCors({
    origin: frontendOrigin,
    credentials: true,
  });

  const rabbitUrl = configService.get<string>('RABBITMQ_URL');
  if (!rabbitUrl) {
    throw new Error('RABBITMQ_URL is not defined');
  }

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitUrl],
      queue: 'message_send',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  console.log(`🚀 HTTP server ready at http://localhost:3000/graphql`);
  console.log(`🚀 RabbitMQ connected at ${rabbitUrl}`);
}
bootstrap();
