import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private nativeStorage:NativeStorage){}

  title = null;

  saveToNative(){
    this.nativeStorage.setItem('title', {title: this.title})
      .then(
        () =>console.log('Stored Item!'),
        error => console.error('Error storing item', error)

      );


  }

  getFromNative(){
    this.nativeStorage.getItem('title')
      .then(
        data => this.title = data.title,
        error => console.error(error)
      );

  }

}
