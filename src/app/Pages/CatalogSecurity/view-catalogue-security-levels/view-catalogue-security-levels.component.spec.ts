import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCatalogueSecurityLevelsComponent } from './view-catalogue-security-levels.component';

describe('ViewCatalogueSecurityLevelsComponent', () => {
  let component: ViewCatalogueSecurityLevelsComponent;
  let fixture: ComponentFixture<ViewCatalogueSecurityLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCatalogueSecurityLevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCatalogueSecurityLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
