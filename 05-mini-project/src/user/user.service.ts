import { Injectable } from '@nestjs/common';
import { TodoDTO } from 'src/todo/todo.service';
import { TodoService } from 'src/todo/todo.service';

export type UserDTO = {
  userId: string;
  name: string;
  todoList: TodoDTO[];
  organizationId: string;
};

export type User = {
  userId: string;
  name: string;
  organizationId: string;
};

@Injectable()
export class UserService {
  constructor(private todoService: TodoService) {}
  private readonly users: UserDTO[] = [];

  findAll() {
    const todos: TodoDTO[] = this.todoService.findAll();
    const users: UserDTO[] = this.users;
    const usersReturn: UserDTO[] = [];

    for (let index = 0; index < users.length; index++) {
      const todoOfUser: TodoDTO[] = [];
      for (let index2 = 0; index2 < todos.length; index2++) {
        if (users[index].userId === todos[index2].userId) {
          todoOfUser.push(todos[index2]);
        }
      }
      usersReturn.push({
        userId: users[index].userId,
        name: users[index].name,
        todoList: todoOfUser,
        organizationId: users[index].organizationId,
      });
    }

    return usersReturn;
  }

  create(user: User) {
    const todoList: TodoDTO[] = [];
    const userDTO: UserDTO = {
      userId: user.userId,
      name: user.name,
      organizationId: user.organizationId,
      todoList: todoList,
    };

    this.users.push(userDTO);
  }
}
