import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPendingOrganizationComponent } from './view-pending-organization.component';

describe('ViewPendingOrganizationComponent', () => {
  let component: ViewPendingOrganizationComponent;
  let fixture: ComponentFixture<ViewPendingOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPendingOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPendingOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
