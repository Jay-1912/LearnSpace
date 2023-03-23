import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourseService } from 'src/app/services/course.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-table',
  templateUrl: './quiz-table.component.html',
  styleUrls: ['./quiz-table.component.css']
})
export class QuizTableComponent {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  quizes$:any[] = [];
  constructor(private _snackBar: MatSnackBar,private quizService:QuizService ,public dialog: MatDialog, private courseService:CourseService, private organizationService:OrganizationService, private authService:AuthenticationService){}
  displayTable: boolean = false;
  displayCourses:any[] = [];
  tempInstructorName:string = "";

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id:string): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{isDelete:false}
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result==true){
          this.handleDeleteQuiz(id);
        }
    });
  }

  handleDeleteQuiz(id:string){
    this.quizService.deleteQuiz(id).subscribe((res)=>{
      this.openSnackBar(res.message,"closse");
      location.reload();
    })
  }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.quizService.getQuizes().subscribe((res)=>{
      this.quizes$ = res.quizes;
      for(let quiz of this.quizes$){
        this.organizationService.getOrganizationById(quiz.organization).subscribe( (org)=>{
          org = org[0];
          quiz.organization = org.name;
        })
        this.courseService.getCourseByID(quiz.course).subscribe((course)=>{
          quiz.course = course[0].title;
        } )
        quiz.questions = quiz.questions.length;
      } 
      this.displayTable = true;
    })
    
  }
}
