import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from '../prisma/prisma.service';

const pubSub = new PubSub();

@Resolver(() => Message)
export class MessageResolver {
  constructor(private messageService: MessageService, private prismaService: PrismaService) {}

  @Query(() => [Message])
  messages(@Args('conversationId') conversationId: string) {
    return this.messageService.findByConversation(conversationId);
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('conversationId') conversationId: string,
    @Args('authorId') authorId: string,
    @Args('content') content: string,
  ) {
    const timestamp = Date.now();
    const message = await this.prismaService.message.create({
      data: {
        content,
        timestamp,
        conversation: { connect: { id: conversationId } },
        author: { connect: { id: authorId } },
      },
      include: {
        author: true, 
        conversation: true, 
      },
    });
    await pubSub.publish('messageSent', { messageSent: message });
    return message;
  }

  @Subscription(() => Message, {
    filter: (payload, variables) => payload.messageSent.conversation.id === variables.conversationId,
    resolve: payload => payload.messageSent,
  })
  messageSent(@Args('conversationId') conversationId: string) {
    return pubSub.asyncIterableIterator('messageSent');
  }
}
