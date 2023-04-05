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
  doc!: string;
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
      this.doc = `http://localhost:3000/images/${this.orgData.branchDocument}`;
    });
  }

  registerOrgConfirmBtnClick(event: any) {
    event.preventDefault();
    // add org to organization and remove from pending list

    // TODO:what to send in image because required type is file and we have string only

    const createdOrgData = {
      name: this.orgData.name,
      branchName: this.orgData.branchName,
      email: this.orgData.branchEmail,
      password:
        this.orgData.name + Math.random().toString(36).slice(-8) + 'LearnSpace',
      phone: this.orgData.branchTelephone,
      image: this.orgData.branchLogo,
    };

    this.orgService
      .postPendingOrganizationToRegistered(createdOrgData)
      .subscribe((data) => {
        console.log(data);
      });
    this.orgService
      .deletePendingOrganization(this.orgData._id)
      .subscribe((data) => {
        console.log(data);
      });

    // send email to organization containing username and pass
  }
  registerOrgCancelBtnClick(event: any) {
    event.preventDefault();
    this.orgService
      .deletePendingOrganization(this.orgData._id)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
