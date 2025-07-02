import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQService } from '../rabbitmq/rabbimq.service';
import { Inject } from '@nestjs/common';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private messageService: MessageService, private prismaService: PrismaService, private rabbitmqService: RabbitMQService, @Inject('PUB_SUB') private pubSub: PubSub,) {}

  @Query(() => [Message])
  messages(@Args('conversationId') conversationId: string) {
    return this.messageService.findByConversation(conversationId);
  }

  @Mutation(() => Boolean)
    async sendMessage(
      @Args('conversationId') conversationId: string,
      @Args('authorId') authorId: string,
      @Args('content') content: string,
    ) {
      const timestamp = Date.now();
      await this.rabbitmqService.sendMessage('message_send', {
        conversationId,
        authorId,
        content,
        timestamp,
      });
      return true;
  }

  @Subscription(() => Message, {
    filter: (payload, variables) => {
      console.log('Subscription filter payload:', payload);
      console.log('Subscription filter variables:', variables);
      return payload.messageSent.conversation.id === variables.conversationId;
    },
    resolve: (payload) => {
      console.log('Subscription resolve payload:', payload);
      return payload.messageSent;
    },
  })
  messageSent(@Args('conversationId') conversationId: string) {
    console.log('Subscription started for conversation:', conversationId);
    return this.pubSub.asyncIterableIterator('messageSent');
  }

}
