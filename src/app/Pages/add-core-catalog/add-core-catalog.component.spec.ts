import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoreCatalogComponent } from './add-core-catalog.component';

describe('AddCoreCatalogComponent', () => {
  let component: AddCoreCatalogComponent;
  let fixture: ComponentFixture<AddCoreCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCoreCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoreCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
