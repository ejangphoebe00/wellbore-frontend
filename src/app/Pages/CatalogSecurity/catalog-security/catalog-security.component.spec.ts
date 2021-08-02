import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSecurityComponent } from './catalog-security.component';

describe('CatalogSecurityComponent', () => {
  let component: CatalogSecurityComponent;
  let fixture: ComponentFixture<CatalogSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogSecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
