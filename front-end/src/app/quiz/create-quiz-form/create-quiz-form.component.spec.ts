import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuizFormComponent } from './create-quiz-form.component';

describe('CreateQuizFormComponent', () => {
  let component: CreateQuizFormComponent;
  let fixture: ComponentFixture<CreateQuizFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQuizFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQuizFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
