import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Editlab4Page } from './editlab4.page';

describe('Editlab4Page', () => {
  let component: Editlab4Page;
  let fixture: ComponentFixture<Editlab4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Editlab4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Editlab4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
