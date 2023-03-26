import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminTableComponent } from './super-admin-table.component';

describe('SuperAdminTableComponent', () => {
  let component: SuperAdminTableComponent;
  let fixture: ComponentFixture<SuperAdminTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdminTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
