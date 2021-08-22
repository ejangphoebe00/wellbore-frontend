import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KfdaComponent } from './kfda.component';

describe('KfdaComponent', () => {
  let component: KfdaComponent;
  let fixture: ComponentFixture<KfdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KfdaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KfdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
