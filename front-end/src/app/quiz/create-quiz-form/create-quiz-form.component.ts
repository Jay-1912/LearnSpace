import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizServiceService } from '../quiz-service.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { ICourse } from 'src/app/shared/interface';
import { CourseService } from 'src/app/services/course.service';
@Component({
  selector: 'app-create-quiz-form',
  templateUrl: './create-quiz-form.component.html',
  styleUrls: ['./create-quiz-form.component.css'],
})
export class CreateQuizFormComponent implements OnInit {
  questions: any[] = [];
  options: any[] = [];
  correctOptions: any[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  organizations: any;
  courses!: any;

  quizForm = new FormGroup({
    quizName: new FormControl('', Validators.required),
    questionText: new FormControl('', Validators.required),
    quizOrganization: new FormControl('', Validators.required),
    quizOrganizationCourse: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.orgService.getOrganization().subscribe((data) => {
      this.organizations = data;
    });
    this.courseService
      .getCoursesByOrg(this.quizForm.controls.quizOrganization.value)
      .subscribe((data: any) => {
        this.courses = data;
        console.log(this.courses);
      });
  }

  setCourseByOrg(event: any) {
    this.courseService
      .getCoursesByOrg(this.quizForm.controls.quizOrganization.value)
      .subscribe((data: any) => {
        this.courses = data;
        console.log(this.courses);
      });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.options.push({ text: value, isTrue: false });
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(section: any): void {
    const index = this.options.indexOf(section);

    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }

  edit(section: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove section if it no longer has a name
    if (!value) {
      this.remove(section);
      return;
    }

    // Edit existing section
    const index = this.options.indexOf(section);
    if (index >= 0) {
      this.options[index].text = value;
    }
  }

  addCorrectOpt(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.correctOptions.push({ text: value });
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeCorrectOpt(section: any): void {
    const index = this.correctOptions.indexOf(section);

    if (index >= 0) {
      this.correctOptions.splice(index, 1);
    }
  }

  editCorrectOpt(section: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove section if it no longer has a name
    if (!value) {
      this.remove(section);
      return;
    }
    // Edit existing section
    const index = this.correctOptions.indexOf(section);
    if (index >= 0) {
      this.correctOptions[index].text = value;
    }
  }

  saveQuestion(event: any) {
    event.preventDefault();
    console.log('question saved');
    const question = {
      questionText: this.quizForm.controls.questionText.value,
      options: this.options,
      correctOptions: this.correctOptions,
    };

    this.correctOptions.forEach((correctOption) => {
      this.options.findIndex((option) => {
        if (option.text === correctOption.text) {
          option.isTrue = true;
        }
      });
    });

    this.questions = [...this.questions, question];
    console.log(this.questions);

    this.resetFormData();
  }

  saveQuiz(event: any) {
    event.preventDefault();
    console.log('quiz saved');
    const formData = new FormData();
    // add data and save

    const quiz = {
      quizName: this.quizForm.controls.quizName.value?.trim(),
      quizOrganization: this.quizForm.controls.quizOrganization.value?.trim(),
      quizOrganizationCourse:
        this.quizForm.controls.quizOrganizationCourse.value?.trim(),
      questions: this.questions,
    };
    console.log('here ' + quiz);

    this.quizService.saveQuiz(quiz).subscribe((data) => {
      console.log(data);
    });
    this.resetFormData();
  }

  public resetFormData() {
    this.quizForm.controls.questionText.reset();
    this.correctOptions = [];
    this.options = [];
  }
  constructor(
    private quizService: QuizServiceService,
    private authService: AuthenticationService,
    private orgService: OrganizationService,
    private courseService: CourseService
  ) {}
}
