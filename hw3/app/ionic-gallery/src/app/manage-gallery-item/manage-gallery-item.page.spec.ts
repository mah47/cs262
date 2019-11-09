import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGalleryItemPage } from './manage-gallery-item.page';

describe('ManageGalleryItemPage', () => {
  let component: ManageGalleryItemPage;
  let fixture: ComponentFixture<ManageGalleryItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGalleryItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGalleryItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
