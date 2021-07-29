import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoreTypeComponent } from './view-core-type.component';

describe('ViewCoreTypeComponent', () => {
  let component: ViewCoreTypeComponent;
  let fixture: ComponentFixture<ViewCoreTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCoreTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoreTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
