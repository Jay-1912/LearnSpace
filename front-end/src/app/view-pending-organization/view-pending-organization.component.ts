import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-pending-organization',
  templateUrl: './view-pending-organization.component.html',
  styleUrls: ['./view-pending-organization.component.css'],
})
export class ViewPendingOrganizationComponent implements OnInit {
  orgData: any;
  loggedInUserId: any;
  loggedInUserRole!: number;
  orgId: any;
  constructor(
    private orgService: OrganizationService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  OrganizationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    image: new FormControl(''),
  });
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      window.location.href = 'http://localhost:4200';
    } else {
      this.loggedInUserId = this.authService.isLoggedIn();
      if (localStorage.getItem('role') !== null) {
        this.loggedInUserRole = parseInt(localStorage.getItem('role') || '');
      }
    }

    // get id from params
    this.orgId = this.route.snapshot.paramMap.get('id');

    this.orgService.getPendingOrganizationById(this.orgId).subscribe((data) => {
      this.orgData = data;
    });
  }

  registerOrgConfirmBtnClick(event: any) {
    event.preventDefault();
    // add org to organization and remove from pending list

    // TODO:what to send in image because required type is file and we have string only

    // const createdOrgData = {
    //   name: this.orgData.name,
    //   branchName: this.orgData.branchName,
    //   email: this.orgData.branchEmail,
    //   password: this.orgData.name + '111LearnSpace',
    //   phone: this.orgData.branchTelephone,
    //   image: this.orgData.branchLogo,
    // };

    // this.orgService.postOrganization(createdOrgData).subscribe((data) => {
    //   console.log(data);
    // });
    // this.orgService
    //   .deletePendingOrganization(this.orgData._id)
    //   .subscribe((data) => {
    //     console.log(data);
    //   });

    // send email to organization containing username and pass
  }
  registerOrgCancelBtnClick(event: any) {
    event.preventDefault();
    // remove for pending list and send email to soruce email of failure
    // this.orgService
    //   .deletePendingOrganization(this.orgData._id)
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
  }
}
