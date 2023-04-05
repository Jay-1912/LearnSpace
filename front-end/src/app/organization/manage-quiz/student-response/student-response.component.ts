import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { QuizService } from 'src/app/services/quiz.service';
import { StudentServicesService } from 'src/app/services/student-services.service';

@Component({
  selector: 'app-student-response',
  templateUrl: './student-response.component.html',
  styleUrls: ['./student-response.component.css']
})
export class StudentResponseComponent implements OnInit{

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private quizService:QuizService, private studentService:StudentServicesService){}

  loggedInUserId!:string;
  loggedInUserRole!:number;
  id: string = '';
  questions:any[] = [];
  students$:any[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  displayTable: boolean = false;
  quizId!:string;

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }else{
      this.loggedInUserId = this.authService.isLoggedIn();
      if(localStorage.getItem("role")!==null){
        this.loggedInUserRole = parseInt(localStorage.getItem("role") || '');
      }
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id') || '';
      this.quizService.getQuizById(this.id).subscribe((res)=>{
        console.log(res);
        this.questions = res.quiz.questions;
        let studentIds:any[] = [];
        if(res.quiz.students){
          studentIds = Object.keys(res.quiz.students);
        }
        this.quizId = res.quiz._id;
        this.studentService.getStudents().subscribe((stus)=>{
          this.students$ = stus.filter((stu:any)=>{
            return studentIds.includes(stu._id);
          })
          this.displayTable = true;
        })
      })
    }
  }
}
