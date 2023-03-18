import { OnInit, Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuizServiceService } from '../quiz-service.service';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css'],
})
export class ViewQuizComponent implements OnInit, AfterViewInit {
  // TODO: create quiz interface
  quiz: any;
  private quizId!: string | null;
  private questionResps!: any;
  question: any;
  score: number = 0;

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    console.log(this.quizId);

    // TODO: fix quizId null issue
    this.quizService.viewQuiz(this.quizId)?.subscribe((data) => {
      this.quiz = data;
    });
  }

  ngAfterViewInit(): void {
    this.questionResps = this.quiz.questions;

    this.questionResps.forEach((question: any) => {
      question.options.forEach((option: any) => {
        option.isTrue = false;
      });
    });
  }

  handleQuizSubmit(event: any) {
    // TODO: give alert for submission
    event.preventDefault();

    for (let index = 0; index < this.questionResps.length; index++) {
      let trueOpts = this.questionResps[index].options.map((option: any) => {
        if (option.isTrue) {
          return { text: option.text };
        } else {
          return;
        }
      });

      trueOpts = trueOpts.filter(function (element: any) {
        return element !== undefined;
      });

      console.log(trueOpts);
      console.log(this.quiz.questions[index].correctOptions);

      if (
        JSON.stringify(trueOpts) ===
        JSON.stringify(this.quiz.questions[index].correctOptions)
      ) {
        this.score = this.score + 1;
      }
    }

    // TODO: store this quiz with student resp and score
  }

  optionChange(
    questionIndex: number,
    index: number,
    optionText: string,
    isChecked: boolean
  ) {
    this.questionResps[questionIndex].options[index].isTrue = !isChecked;
  }

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizServiceService
  ) {}
}
