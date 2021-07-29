import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratLithoUnitComponent } from './strat-litho-unit.component';

describe('StratLithoUnitComponent', () => {
  let component: StratLithoUnitComponent;
  let fixture: ComponentFixture<StratLithoUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StratLithoUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StratLithoUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
