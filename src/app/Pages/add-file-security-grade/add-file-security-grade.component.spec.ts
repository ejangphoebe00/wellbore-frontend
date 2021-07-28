import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileSecurityGradeComponent } from './add-file-security-grade.component';

describe('AddFileSecurityGradeComponent', () => {
  let component: AddFileSecurityGradeComponent;
  let fixture: ComponentFixture<AddFileSecurityGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFileSecurityGradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFileSecurityGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
