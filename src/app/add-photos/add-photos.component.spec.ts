import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotosComponent } from './add-photos.component';

describe('AddPhotosComponent', () => {
  let component: AddPhotosComponent;
  let fixture: ComponentFixture<AddPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
