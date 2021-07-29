import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStratLithoUnitComponent } from './view-strat-litho-unit.component';

describe('ViewStratLithoUnitComponent', () => {
  let component: ViewStratLithoUnitComponent;
  let fixture: ComponentFixture<ViewStratLithoUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStratLithoUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStratLithoUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
