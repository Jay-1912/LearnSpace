import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizServiceService } from '../quiz-service.service';
@Component({
  selector: 'app-create-quiz-form',
  templateUrl: './create-quiz-form.component.html',
  styleUrls: ['./create-quiz-form.component.css'],
})
export class CreateQuizFormComponent {
  questions: any[] = [];
  options: any[] = [];
  correctOptions: any[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  quizForm = new FormGroup({
    quizName: new FormControl('', Validators.required),
    questionText: new FormControl(''),
  });

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
      questions: this.questions,
    };

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
  constructor(private quizService: QuizServiceService) {}
}
