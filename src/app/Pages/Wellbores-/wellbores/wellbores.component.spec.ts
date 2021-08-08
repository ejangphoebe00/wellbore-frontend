import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellboresComponent } from './wellbores.component';

describe('WellboresComponent', () => {
  let component: WellboresComponent;
  let fixture: ComponentFixture<WellboresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellboresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WellboresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
