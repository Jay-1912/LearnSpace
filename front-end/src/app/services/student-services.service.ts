import { HttpClient } from '@angular/common/http';
import { Injectable , OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServicesService implements OnInit{

  baseurl = "http://localhost:3000"


  getStudents() {
    return this.http.get<any>(this.baseurl + `/get-students`);
  }

  getStudentsByOrg(org : String) {
    return this.http.get<any>(this.baseurl + `/get-students/${org}`);
  }
  
  getStudentById(id : string) {
    return this.http.get<any>(this.baseurl + `/get-student/${id}`)
  }

  updateProgress(studentId:string, courseId:string, section:number, lesson:number):Observable<any>{
    let url = this.baseurl + '/update-student-progress';
    return this.http.post<any>(url, {studentId, courseId, section, lesson});
  }

  getStudentProgress(studentId:string, courseId:string){
    let url = this.baseurl + "/get-student-progress/"+studentId+"/"+courseId;
    return this.http.get<any>(url);
  }


  ngOnInit(): void {
      
  }    

  constructor(private http : HttpClient) { }
}
