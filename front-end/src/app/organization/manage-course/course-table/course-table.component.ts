import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { Subject } from 'rxjs';
import { OrganizationService } from 'src/app/services/organization.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css'],
})
export class CourseTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  courses$:any[] = [];
  constructor(public dialog: MatDialog, private courseService:CourseService, private instructorService:InstructorService, private organizationService:OrganizationService, private authService:AuthenticationService){}
  displayTable: boolean = false;
  displayCourses:any[] = [];
  tempInstructorName:string = "";
  loggedInUserId!:string;
  loggedInUserRole!:number;

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id:string): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{isDelete:false}
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result==true){
          this.handleDeleteCourse(id);
        }
    });
  }

  handleDeleteCourse(id:string){
    this.courseService.deleteCourse(id).subscribe((res)=>{
      console.log(res);
      location.reload();
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



    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.courseService.getCourses().subscribe((courses) =>{
      if(this.loggedInUserRole!=0){
        if(this.loggedInUserRole==1){
          this.courses$ = courses.filter( (course:any)=>{
            return course.organization == this.loggedInUserId;
          } )
        }else{
          this.courses$ = courses.filter( (course:any)=>{
            return course.instructor == this.loggedInUserId;
          } )
        }
      }else{
        this.courses$ = courses;
      }
      
      for(let course of this.courses$){
        this.organizationService.getOrganizationById(course.organization).subscribe((org)=>{
          org = org[0];
          course.organization = org.name;
        });

        this.instructorService.getInstructorByID(course.instructor).subscribe( (instructor) =>{
          instructor = instructor[0];
          course.instructor = instructor.firstName + " " + instructor.lastName;
        });

        course.enrolled_students = course.enrolled_students.length;
      }
      this.displayTable = true;
    })
  }
}
