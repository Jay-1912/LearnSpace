import { Component, OnInit } from '@angular/core';
import { StudentServicesService } from 'src/app/services/student-services.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css'],
})
export class StudentsTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  students$: any[] = [];
  organization: String = 'bvm';
  constructor(
    private authService:AuthenticationService,
    public dialog: MatDialog,
    private studentService: StudentServicesService,
    private http: HttpClient,
    private router: Router,
    private organizationService:OrganizationService
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


    this.studentService
      .getStudents()
      .subscribe((data) => {
        if(this.loggedInUserRole==1){
          this.students$ = data.filter((stu:any)=>{
            return stu.organization === this.loggedInUserId;
          })
        }else{
          this.students$ = data;
        } 
        
        for(let student of this.students$){
            this.organizationService.getOrganizationById(student.organization).subscribe( (res)=>{
              res = res[0];
              student.organization = res.name;
            } )
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

    const deleteUrl = 'http://localhost:3000/delete-student/';
    this.http.delete<any>(deleteUrl + id).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['', StudentsTableComponent]);
    window.location.reload();
  }
}
