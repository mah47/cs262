import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todos: Todo[] = [];

  constructor() {
    this.todos =[{
      id: 123,
      title: 'hello',
      description: 'test'
    }];
   }

  load(){

  }

  save(){

  }

  getTodo(id){

  }

  addTodo(todo){

  }
}
