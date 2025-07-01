import { Resolver, Mutation, Args, Subscription, Query } from '@nestjs/graphql';
import { Message } from './message.model';
import { RabbitMQService } from '../rabbitmq/rabbimq.service';
import { MessageService } from './message.service';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly rabbitmqService: RabbitMQService,
    private readonly messageService: MessageService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => String)
  _ping() {
    return 'pong';
  }

  @Mutation(() => Boolean)
  async sendMessage(
    @Args('conversationId') conversationId: string,
    @Args('content') content: string,
  ): Promise<boolean> {
    const payload = {
      conversationId,
      content,
      authorId: 'mock-user',
      timestamp: Date.now(),
    };

    await this.rabbitmqService.sendMessage('message_send', payload);
    return true;
  }

  @Query(() => [Message], { name: 'messages' })
  async getMessages(@Args('conversationId') conversationId: string): Promise<Message[]> {
    return this.messageService.findMessagesByConversation(conversationId);
  }

  @Subscription(() => Message, {
    filter: (payload, variables) => payload.conversationId === variables.conversationId,
    resolve: (value) => value,
  })
  onMessageSent(@Args('conversationId') conversationId: string) {
    return this.pubSub.asyncIterableIterator('message_sent');
  }
}
