import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuttingsListComponent } from './cuttings-list.component';

describe('CuttingsListComponent', () => {
  let component: CuttingsListComponent;
  let fixture: ComponentFixture<CuttingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuttingsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuttingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
