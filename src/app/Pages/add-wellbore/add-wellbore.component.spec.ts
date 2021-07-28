import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWellboreComponent } from './add-wellbore.component';

describe('AddWellboreComponent', () => {
  let component: AddWellboreComponent;
  let fixture: ComponentFixture<AddWellboreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWellboreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWellboreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
