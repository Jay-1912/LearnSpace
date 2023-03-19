import { Component, OnInit } from '@angular/core';
import { StudentServicesService } from 'src/app/services/student-services.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { QuizServiceService } from '../quiz-service.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-quiz-table',
  templateUrl: './quiz-table.component.html',
  styleUrls: ['./quiz-table.component.css'],
})
export class QuizTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  students$: any[] = [];
  organization: String = 'bvm';
  quizes: any;
  constructor(
    public dialog: MatDialog,
    private studentService: StudentServicesService,
    private http: HttpClient,
    private router: Router,
    private organizationService: OrganizationService,
    private quizService: QuizServiceService,
    private courseService: CourseService
  ) {}
  displayTable: boolean = false;
  displayStudents: any[] = [];

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };

    this.quizService.getQuiz().subscribe((data) => {
      this.quizes = data;

      for (let quiz of this.quizes) {
        console.log(quiz);

        this.courseService
          .getCourseByID(quiz.quizOrganizationCourse)
          .subscribe((res) => {
            quiz.quizOrganizationCourse = res[0].title;
          });

        this.organizationService
          .getOrganizationById(quiz.quizOrganization)
          .subscribe((res) => {
            quiz.quizOrganization = res[0].name;
            console.log(res);
          });
      }
      this.displayTable = true;
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    id: string
  ): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { isDelete: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteQuiz(id);
      }
    });
  }

  public deleteQuiz(id: string) {
    console.log('here');

    const deleteUrl = 'http://localhost:3000/delete-quiz/';
    this.http.delete<any>(deleteUrl + id).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['', QuizTableComponent]);
    window.location.reload();
  }
}
