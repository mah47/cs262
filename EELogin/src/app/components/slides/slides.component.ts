import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {
  slideOpts = {
    intitialSlide: 0,
    speed: 400
  };
  constructor() {}

  ngOnInit(){}
}
