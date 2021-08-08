import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSecurityLevelsComponent } from './web-security-levels.component';

describe('WebSecurityLevelsComponent', () => {
  let component: WebSecurityLevelsComponent;
  let fixture: ComponentFixture<WebSecurityLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebSecurityLevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSecurityLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
