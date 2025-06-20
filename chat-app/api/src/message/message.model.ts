import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  id: string;

  @Field()
  conversationId: string;

  @Field()
  content: string;

  @Field()
  authorId: string;

  @Field(() => Float)
  timestamp: number;
}
