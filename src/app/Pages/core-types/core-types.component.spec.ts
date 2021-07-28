import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreTypesComponent } from './core-types.component';

describe('CoreTypesComponent', () => {
  let component: CoreTypesComponent;
  let fixture: ComponentFixture<CoreTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
