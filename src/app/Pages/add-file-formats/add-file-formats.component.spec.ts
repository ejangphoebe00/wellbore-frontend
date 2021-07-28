import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileFormatsComponent } from './add-file-formats.component';

describe('AddFileFormatsComponent', () => {
  let component: AddFileFormatsComponent;
  let fixture: ComponentFixture<AddFileFormatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFileFormatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFileFormatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
