import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeacherComponent } from './manage-teacher.component';

describe('ManageTeacherComponent', () => {
  let component: ManageTeacherComponent;
  let fixture: ComponentFixture<ManageTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
