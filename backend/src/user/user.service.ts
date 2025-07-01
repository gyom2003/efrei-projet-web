import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(data): User {
    const user: User = {
      id: `${Date.now()}`,
      username: data.username,
      password: data.password,
      email: data.email,
      createdAt: new Date().toISOString(),
    };
    this.users.push(user);
    return user;
  }

  findById(id: string): User | null {
    return this.users.find((u) => u.id === id) || null;
  }
}