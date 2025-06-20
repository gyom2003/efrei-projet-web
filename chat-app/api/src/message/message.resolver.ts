import { Resolver, Mutation, Args, Subscription, Query } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Message } from './message.model';
import { RabbitMQService } from '../../rabbitmq/rabbitmq.service';

const pubSub = new PubSub();

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly rabbitmqService: RabbitMQService) {}

  @Query(() => String)
  _empty() {
    return 'ok';
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

    // Envoie vers RabbitMQ (par ex. pour traitement en Worker)
    await this.rabbitmqService.sendMessage('message_send', payload);

    // Publie localement pour la subscription GraphQL
    //await pubSub.publish('message_sent', payload);

    return true;
  }

  @Subscription(() => Message, {
    filter: (payload, variables) =>
      payload.conversationId === variables.conversationId,
    resolve: (value) => value,
  })
  onMessageSent(@Args('conversationId') conversationId: string) {
    return pubSub.asyncIterableIterator('message_sent');
  }
}
