import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  value1;
  value2;
  answer;

  addition(){
    this.answer = parseInt(this.value1) + parseInt(this.value2);
  }
  subtraction(){
    this.answer = parseInt(this.value1) - parseInt(this.value2);
  }
  multiplication(){
    this.answer = parseInt(this.value1) * parseInt(this.value2);
  }
  division(){
    this.answer = parseInt(this.value1) / parseInt(this.value2);
  }


}
