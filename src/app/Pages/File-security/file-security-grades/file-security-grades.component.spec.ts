import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSecurityGradesComponent } from './file-security-grades.component';

describe('FileSecurityGradesComponent', () => {
  let component: FileSecurityGradesComponent;
  let fixture: ComponentFixture<FileSecurityGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSecurityGradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSecurityGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
