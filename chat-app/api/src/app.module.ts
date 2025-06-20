import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { MessageResolver } from './message/message.resolver';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { PrismaModule } from '../../worker/src/prisma/prisma.module';
import { PubSubService } from './pubsub/pubsub.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    RabbitMQModule,
    PrismaModule
  ],
  providers: [MessageResolver, RabbitMQService, MessageService, PubSubService],
  controllers: [MessageController],
})
export class AppModule {}
