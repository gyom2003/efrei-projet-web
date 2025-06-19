import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { MessageResolver } from '../message/message.resolver';
import { MessageController } from '../message/message.controller';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
            installSubscriptionHandlers: true,
    }),
    RabbitMQModule,
  ],
  providers: [MessageResolver, RabbitMQService],
  controllers: [MessageController],
})
export class AppModule {}
