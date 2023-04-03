import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrgRequestsFormComponent } from './pending-org-requests-form.component';

describe('PendingOrgRequestsFormComponent', () => {
  let component: PendingOrgRequestsFormComponent;
  let fixture: ComponentFixture<PendingOrgRequestsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingOrgRequestsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingOrgRequestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
