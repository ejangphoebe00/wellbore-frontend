import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoresComponent } from './add-cores.component';

describe('AddCoresComponent', () => {
  let component: AddCoresComponent;
  let fixture: ComponentFixture<AddCoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
