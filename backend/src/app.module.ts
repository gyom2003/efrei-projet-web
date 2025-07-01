import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { MessageResolver } from './message/message.resolver';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { RabbitMQService } from './rabbitmq/rabbimq.service';
import { PrismaModule } from './prisma/prisma.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { UserResolver } from 'graphQL/resolver/user.resolver';
import { UsersService } from 'graphQL/services/user.service';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    RabbitMQModule,
    PrismaModule,
    PubSubModule,
  ],
  providers: [MessageResolver, RabbitMQService, MessageService, UserResolver, UsersService],
  controllers: [MessageController],
})
export class AppModule {}
