import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeacherServicesService {
  baseurl = 'http://localhost:3000';

  getTeachers(){
    return this.http.get<any>(this.baseurl + '/teachers');
  }

  getTeachersByOrg(org: String) {
    return this.http.get<any>(this.baseurl + `/get-teachers/${org}`);
  }

  getTeacherById(id: string) {
    return this.http.get<any>(this.baseurl + `/teacher/${id}`);
  }

  constructor(private http: HttpClient) {
    this.http.get<any>('');
  }
}
