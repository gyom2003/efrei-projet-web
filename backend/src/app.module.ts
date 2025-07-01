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
import { JwtModule } from '@nestjs/jwt';
import { verifyToken } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      context: ({ req }) => {
        const authHeader = req.headers.authorization || '';
        const operationName = req.body?.operationName;

        const publicOperations = ['createUser', 'login'];

        if (operationName && publicOperations.includes(operationName)) {
          // opérations publiques sans token
          return { user: null };
        }

        if (!authHeader) {
          throw new Error('No token provided');
        }

        const token = authHeader.split(' ')[1];
        const user = verifyToken(token);
        return { user };
      },

    }),
    RabbitMQModule,
    PrismaModule,
    PubSubModule,
    JwtModule.register({
      secret: process.env.TOKEN_KEY,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [MessageResolver, RabbitMQService, MessageService, UserService, UserResolver, ConversationService, ConversationResolver],
  controllers: [MessageController],
})
export class AppModule {}
