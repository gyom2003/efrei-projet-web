import {
  Resolver,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { PrismaService } from '../../src/prisma/prisma.service';
import * as bcrypt from "bcryptjs";
import { User } from '../models/user.model';
// import { PubSub } from 'graphql-subscriptions';
// import { Inject } from '@nestjs/common';
// import { UsersService } from '../services/user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly prisma: PrismaService) {}

    @Query(() => [User])
    users() {
        return this.prisma.user.findMany({ orderBy: { createdAt: 'asc'} })
    }

    
    @Query(() => User, { nullable: true })
    user(@Args('id') id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    //mutation add user method
    @Mutation(() => User)
    async createUser(
        @Args('username') username: string,
        @Args('password') password: string,
        @Args('email') email: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: {
            username,
            password: hashedPassword,
            email
            },
        });
    }
}

