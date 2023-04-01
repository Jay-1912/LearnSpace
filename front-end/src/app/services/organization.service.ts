import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, ObservedValueOf, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getOrganization(): Observable<any> {
    const url = this.url + 'organizations';
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  getOrganizationById(id: string): Observable<any> {
    const url = this.url + 'organization/' + id;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  postOrganization(organization: any): Observable<any> {
    const url = this.url + 'add_organization';
    return this.http
      .post<any>(url, organization)
      .pipe(catchError(this.handleError));
  }

  updateOrganization(id: string, organization: any): Observable<any> {
    const url = this.url + 'edit_organization/' + id;
    return this.http
      .post<any>(url, organization)
      .pipe(catchError(this.handleError));
  }

  deleteOrganization(id: string): Observable<any> {
    const url = this.url + 'delete_organization/' + id;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  postOrganizationForRegistration(data: any) {
    console.log(data, this.url);

    const url = this.url + 'post_org_for_registration';
    return this.http.post<any>(url, data).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(() => new Error(errMessage));
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return throwError(() => new Error(error || 'Node.js server error'));
  }
}
