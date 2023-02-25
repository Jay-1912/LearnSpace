import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureContentComponent } from './lecture-content.component';

describe('LectureContentComponent', () => {
  let component: LectureContentComponent;
  let fixture: ComponentFixture<LectureContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectureContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectureContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
