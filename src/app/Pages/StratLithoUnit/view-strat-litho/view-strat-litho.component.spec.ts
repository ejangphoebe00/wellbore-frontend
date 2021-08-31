import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStratLithoComponent } from './view-strat-litho.component';

describe('ViewStratLithoComponent', () => {
  let component: ViewStratLithoComponent;
  let fixture: ComponentFixture<ViewStratLithoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStratLithoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStratLithoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
