import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCurriculumComponent } from './course-curriculum.component';

describe('CourseCurriculumComponent', () => {
  let component: CourseCurriculumComponent;
  let fixture: ComponentFixture<CourseCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCurriculumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
