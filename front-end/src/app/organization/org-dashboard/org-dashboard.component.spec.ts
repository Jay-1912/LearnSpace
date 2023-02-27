import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgDashboardComponent } from './org-dashboard.component';

describe('OrgDashboardComponent', () => {
  let component: OrgDashboardComponent;
  let fixture: ComponentFixture<OrgDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
