import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { QuizService } from 'src/app/services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-single-response',
  templateUrl: './single-response.component.html',
  styleUrls: ['./single-response.component.css']
})
export class SingleResponseComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private quizService:QuizService,private authService:AuthenticationService, private route:ActivatedRoute){}
  loggedInUserId!:string;
  loggedInUserRole!:number;
  quizId!:string;
  studentId!:string;
  questions:any[] = [];
  answers:any[] = [];
  type:string='mcqs';
  marksForm!:FormGroup;
  marks:any[] = [];
  
  feedbackForm = new FormGroup({
    "feedback": new FormControl("")
  })

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  handleFeedback(event:Event){
    event.preventDefault();
    this.quizService.giveFeedback(this.quizId, this.studentId, this.feedbackForm.value).subscribe((res)=>{
      this.openSnackBar(res.message, "close");
    })
  }

  handleMarks(event:Event){
    event.preventDefault();
    this.quizService.assignMarks(this.quizId, this.studentId, this.marksForm.value).subscribe((res)=>{
      this.openSnackBar(res.message, "close");
    })
  }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }else{
      this.loggedInUserId = this.authService.isLoggedIn();
      if(localStorage.getItem("role")!==null){
        this.loggedInUserRole = parseInt(localStorage.getItem("role") || '');
      }
    }  

    this.quizId = this.route.snapshot.paramMap.get('quizId') || '';
    this.studentId = this.route.snapshot.paramMap.get('studentId') || '';

    let form:any = {};

    this.quizService.getQuizById(this.quizId).subscribe((res)=>{
      console.log(res);
      this.questions = res.quiz.questions;
      this.answers = res.quiz.students[this.studentId];
      this.marks = res.quiz.marks[this.studentId];
      this.type = res.quiz.type;
      for(let i=0;i<this.marks.length;i++){
        form[i] = new FormControl(this.marks[i]);
      }
      this.marksForm = new FormGroup(form);
      if(res.quiz.feedback){
        if(res.quiz.feedback[this.studentId]){
          this.feedbackForm.controls["feedback"].setValue(res.quiz.feedback[this.studentId]);
        }
      }
    })
  }
}
