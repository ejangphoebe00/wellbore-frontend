import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFormatsComponent } from './file-formats.component';

describe('FileFormatsComponent', () => {
  let component: FileFormatsComponent;
  let fixture: ComponentFixture<FileFormatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileFormatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileFormatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
