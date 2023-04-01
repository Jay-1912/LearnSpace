import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRegistrationFormComponent } from './org-registration-form.component';

describe('OrgRegistrationFormComponent', () => {
  let component: OrgRegistrationFormComponent;
  let fixture: ComponentFixture<OrgRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgRegistrationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
