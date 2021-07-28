import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellboreCoreComponent } from './wellbore-core.component';

describe('WellboreCoreComponent', () => {
  let component: WellboreCoreComponent;
  let fixture: ComponentFixture<WellboreCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellboreCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WellboreCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
