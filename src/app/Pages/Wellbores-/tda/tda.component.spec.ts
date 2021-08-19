import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdaComponent } from './tda.component';

describe('TdaComponent', () => {
  let component: TdaComponent;
  let fixture: ComponentFixture<TdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
