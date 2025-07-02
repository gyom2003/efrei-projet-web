import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Message } from '../message/message.model';
import { Conversation } from '../conversation/conversation.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field(() => [Message], { nullable: true })
  messages?: Message[];

  @Field(() => [Conversation], { nullable: true })
  conversations?: Conversation[];
}
