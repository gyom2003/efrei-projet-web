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
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { ConversationService } from './conversation/conversation.service';
import { ConversationResolver } from './conversation/conversation.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    RabbitMQModule,
    PrismaModule,
    PubSubModule
  ],
  providers: [MessageResolver, RabbitMQService, MessageService, UserService, UserResolver, ConversationService, ConversationResolver],
  controllers: [MessageController],
})
export class AppModule {}
