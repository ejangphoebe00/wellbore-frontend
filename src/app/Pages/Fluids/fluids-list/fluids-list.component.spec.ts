import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidsListComponent } from './fluids-list.component';

describe('FluidsListComponent', () => {
  let component: FluidsListComponent;
  let fixture: ComponentFixture<FluidsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluidsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluidsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
