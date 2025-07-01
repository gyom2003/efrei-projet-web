import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.model';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private conversationService: ConversationService, private prismaService: PrismaService) {}

  @Query(() => [Conversation])
  conversations() {
    return this.conversationService.findAll();
  }

  @Query(() => Conversation, { nullable: true })
  conversation(@Args('id') id: string) {
    return this.conversationService.findOne(id);
  }

  @Mutation(() => Conversation)
  createConversation(@Args({ name: 'participantIds', type: () => [String] }) participantIds: string[]) {
    return this.conversationService.create(participantIds);
  }
}
