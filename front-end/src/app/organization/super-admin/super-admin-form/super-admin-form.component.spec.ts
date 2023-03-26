import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminFormComponent } from './super-admin-form.component';

describe('SuperAdminFormComponent', () => {
  let component: SuperAdminFormComponent;
  let fixture: ComponentFixture<SuperAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
