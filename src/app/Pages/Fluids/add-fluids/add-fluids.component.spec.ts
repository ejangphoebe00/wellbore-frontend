import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFluidsComponent } from './add-fluids.component';

describe('AddFluidsComponent', () => {
  let component: AddFluidsComponent;
  let fixture: ComponentFixture<AddFluidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFluidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFluidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
