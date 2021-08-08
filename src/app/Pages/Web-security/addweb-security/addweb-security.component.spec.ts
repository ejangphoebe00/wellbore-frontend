import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwebSecurityComponent } from './addweb-security.component';

describe('AddwebSecurityComponent', () => {
  let component: AddwebSecurityComponent;
  let fixture: ComponentFixture<AddwebSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddwebSecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwebSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
