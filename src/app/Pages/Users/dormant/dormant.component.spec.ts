import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormantComponent } from './dormant.component';

describe('DormantComponent', () => {
  let component: DormantComponent;
  let fixture: ComponentFixture<DormantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
