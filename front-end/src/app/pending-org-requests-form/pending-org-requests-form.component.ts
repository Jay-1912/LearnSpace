import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentServicesService } from '../services/student-services.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrganizationService } from '../services/organization.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-pending-org-requests-form',
  templateUrl: './pending-org-requests-form.component.html',
  styleUrls: ['./pending-org-requests-form.component.css'],
})
export class PendingOrgRequestsFormComponent {
  loggedInUserId: any;
  loggedInUserRole!: number;
  displayTable!: boolean;
  pendingOrgs: any[] = [];
  constructor(
    public dialog: MatDialog,
    private studentService: StudentServicesService,
    private http: HttpClient,
    private router: Router,
    private organizationService: OrganizationService,
    private authService: AuthenticationService
  ) {}

  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      window.location.href = 'http://localhost:4200';
    } else {
      this.loggedInUserId = this.authService.isLoggedIn();
      if (localStorage.getItem('role') !== null) {
        this.loggedInUserRole = parseInt(localStorage.getItem('role') || '');
      }
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };

    this.organizationService.getPendingOrganizations().subscribe((data) => {
      this.pendingOrgs = data;

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
        this.deleteStudent(id);
      }
    });
  }

  // change deletestudent to view org
  public deleteStudent(id: string) {
    console.log('here');

    const deleteUrl = 'http://localhost:3000/delete-student/';
    this.http.delete<any>(deleteUrl + id).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['', PendingOrgRequestsFormComponent]);
    window.location.reload();
  }
}
