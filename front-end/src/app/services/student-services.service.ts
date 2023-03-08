import { HttpClient } from '@angular/common/http';
import { Injectable , OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentServicesService implements OnInit{

  baseurl = "http://localhost:3000"

  getStudentsByOrg(org : String) {
    return this.http.get<any>(this.baseurl + `/get-students/${org}`);
  }
  
  getStudentById(id : string) {
    return this.http.get<any>(this.baseurl + `/get-student/${id}`)
  }
  ngOnInit(): void {
      
  }    

  constructor(private http : HttpClient) { }
}
