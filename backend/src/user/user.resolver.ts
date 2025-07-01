import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';

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
}
