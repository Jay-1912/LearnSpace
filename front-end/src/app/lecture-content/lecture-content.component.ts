import { Component, Input, OnChanges } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { StudentServicesService } from '../services/student-services.service';
import { FormControl, FormGroup } from '@angular/forms';
import { QuizService } from '../services/quiz.service';


@Component({
  selector: 'app-lecture-content',
  templateUrl: './lecture-content.component.html',
  styleUrls: ['./lecture-content.component.css']
})
export class LectureContentComponent implements OnChanges {
  constructor(private quizService: QuizService,private route:ActivatedRoute, private authService:AuthenticationService, private studentService:StudentServicesService){}

  @Input() src!:string;
  @Input() type!:string;
  source!:string;
  loggedInUserId:string="";
  courseId:string="";
  section!:number;
  lesson!:number;
  quizForm!: FormGroup;
  questions:any[] = [];
  attendedQuiz:boolean = false;
  selected_options:any[] = [];
  quizType!:string;
  marks:any[] = [];
  feedback:string = "";

  updateProgress(){
    this.studentService.updateProgress(this.loggedInUserId, this.courseId, this.section, this.lesson).subscribe( (res)=>{
      console.log(res);
    } )
  }

  handleQuiz(event:Event){
    event.preventDefault();
    this.quizService.attendQuiz(this.src, this.loggedInUserId, this.quizForm.value).subscribe((res)=>{
      if(res.code==200){
        location.reload();
      }
    })
  }

  ngOnChanges(){
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }else{
      this.loggedInUserId = this.authService.isLoggedIn();
    }

    this.courseId = this.route.snapshot.paramMap.get('id') || "";
    this.section = parseInt(this.route.snapshot.paramMap.get('section') || "");
    this.lesson = parseInt(this.route.snapshot.paramMap.get("lesson") || "");
    this.source = "http://localhost:3000/images/"+this.src;
    if(this.type=="quiz"){
      let form :any = {};
      this.quizService.getQuizById(this.src).subscribe((res)=>{
        if(res.quiz.students){
          let students:any = Object.keys(res.quiz.students);
          if(students.includes(this.loggedInUserId)){
            this.attendedQuiz = true;
            this.selected_options = res.quiz.students[this.loggedInUserId];
            this.marks = res.quiz.marks[this.loggedInUserId];
            if(res.quiz.feedback){
              this.feedback = res.quiz.feedback[this.loggedInUserId];
            }
          }else{
            this.attendedQuiz = false;
          }
        }
        this.questions = res.quiz.questions
        this.quizType = res.quiz.type;
        for(let i=0;i<this.questions.length; i++){
          form[i] = new FormControl('');
        }
        this.quizForm = new FormGroup(form);
      })
    } 
  }
}
