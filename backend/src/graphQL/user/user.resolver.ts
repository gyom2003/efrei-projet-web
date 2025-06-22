import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './user.model';
import bcrypt from "bcryptjs";


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
    async addUser(
        @Args('username') username: string,
        @Args('password') password: string
    ) {
        return this.prisma.user.create({
            data: { username, password: await bcrypt.hash(password, 10) }
        })
    }
}
