import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RocksListComponent } from './rocks-list.component';

describe('RocksListComponent', () => {
  let component: RocksListComponent;
  let fixture: ComponentFixture<RocksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RocksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RocksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
