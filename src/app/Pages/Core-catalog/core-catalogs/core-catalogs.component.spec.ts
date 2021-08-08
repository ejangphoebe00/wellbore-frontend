import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreCatalogsComponent } from './core-catalogs.component';

describe('CoreCatalogsComponent', () => {
  let component: CoreCatalogsComponent;
  let fixture: ComponentFixture<CoreCatalogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreCatalogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreCatalogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
