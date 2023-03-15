import { Component, OnInit } from '@angular/core';
import { StudentServicesService } from 'src/app/services/student-services.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';

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
    private studentService: StudentServicesService,
    private http: HttpClient,
    private router: Router,
    private organizationService:OrganizationService
  ) {}
  displayTable: boolean = false;
  displayStudents: any[] = [];

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };


    this.studentService
      .getStudents()
      .subscribe((data) => {
        console.log(data);
        console.log('here');
        this.students$ = data;

        for(let student of this.students$){
            this.organizationService.getOrganizationById(student.organization).subscribe( (res)=>{
              res = res[0];
              student.organization = res.name;
            } )
        }

        this.displayTable = true;
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
