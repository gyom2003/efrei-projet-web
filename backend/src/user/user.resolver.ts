import { Resolver, Query, Mutation, Args, ObjectType, Field } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';

@ObjectType()
class LoginResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  user(@Args('id') id: string) {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.createUser({
      username,
      password: hashedPassword,
    });
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.userService.login(username, password);
  }
}
