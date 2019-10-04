import { Component, OnInit } from '@angular/core';
import {Todo} from '../interfaces/todo';

@Component({
  selector: 'app-editlab4',
  templateUrl: './editlab4.page.html',
  styleUrls: ['./editlab4.page.scss'],
})
export class Editlab4Page implements OnInit {

  private todo: Todo;

  constructor() { 
    this.todo = {
      id:0,
      title: '',
      description: ''

    };
  }

  ngOnInit() {
    //grab ID from route
  }

  saveTodo(){

  }

}
