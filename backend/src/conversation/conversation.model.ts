import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Message } from '../message/message.model';

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id: string;

  @Field(() => [User])
  participants: User[];

  @Field(() => [Message])
  messages: Message[];
}
