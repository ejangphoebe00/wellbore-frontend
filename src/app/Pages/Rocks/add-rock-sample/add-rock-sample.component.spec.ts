import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRockSampleComponent } from './add-rock-sample.component';

describe('AddRockSampleComponent', () => {
  let component: AddRockSampleComponent;
  let fixture: ComponentFixture<AddRockSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRockSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRockSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
