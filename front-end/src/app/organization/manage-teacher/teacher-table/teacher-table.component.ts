import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TeacherServicesService } from 'src/app/services/teacher-services.service';
import { OrganizationService } from 'src/app/services/organization.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css'],
})
export class TeacherTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  teachers$: any[] = [];
  organization: String = 'bvm';
  constructor(
    public dialog: MatDialog,
    private teacherService: TeacherServicesService,
    private http: HttpClient,
    private router: Router,
    private organizationService: OrganizationService,
    private authService:AuthenticationService
  ) {}
  displayTable: boolean = false;
  displayStudents: any[] = [];
  loggedInUserId!:string;
  loggedInUserRole!:number;

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
      processing: true,
    };
    this.teacherService
      .getTeachers()
      .subscribe((data) => {

        if(this.loggedInUserRole!=0){
          this.teachers$ = data.filter( (d:any)=>{
            return d.organization == this.loggedInUserId;
          } )
        }else{
          this.teachers$ = data;
        }
        

        for(let teacher of this.teachers$){
          this.organizationService.getOrganizationById(teacher.organization).subscribe( (res) =>{
            res = res[0];
            teacher.organization = res.name;
          });
        }

        this.displayTable = true;
      });
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
          this.deleteStudent(id);
        }
    });
  }

  public deleteStudent(id: string) {
    console.log('here');

    const deleteUrl = 'http://localhost:3000/delete-teacher/';
    this.http.delete<any>(deleteUrl + id).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['', TeacherTableComponent]);
    window.location.reload();
  }
}
