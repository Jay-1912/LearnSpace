import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TeacherServicesService } from 'src/app/services/teacher-services.service';

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
    private teacherService: TeacherServicesService,
    private http: HttpClient,
    private router: Router
  ) {}
  displayTable: boolean = false;
  displayStudents: any[] = [];

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
    this.teacherService
      .getTeachersByOrg(this.organization)
      .subscribe((data) => {
        console.log(data);
        console.log('here');
        this.teachers$ = data;

        this.displayTable = true;
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
