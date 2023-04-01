import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../services/organization.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-org-registration-form',
  templateUrl: './org-registration-form.component.html',
  styleUrls: ['./org-registration-form.component.css'],
})
export class OrgRegistrationFormComponent {
  image!: string | ArrayBuffer | null;
  constructor(
    private orgService: OrganizationService,
    private _snackBar: MatSnackBar
  ) {}

  applicantTypes = ['individual', 'organization'];
  orgTypes = ['NGO', 'University'];
  @ViewChild('branchDocument') branchDocument!: ElementRef;
  @ViewChild('file') imageFile!: ElementRef;

  createOrgForm = new FormGroup({
    applicantType: new FormControl(),
    name: new FormControl('', Validators.required),
    uniqId: new FormControl('', Validators.required),
    branchName: new FormControl('', Validators.required),
    branchAddress: new FormControl('', Validators.required),
    branchCity: new FormControl('', Validators.required),
    branchState: new FormControl('', Validators.required),
    branchTelephone: new FormControl('', Validators.required),
    branchEmail: new FormControl('', Validators.required),
    branchOwnerName: new FormControl('', Validators.required),
    branchOwnerTelephone: new FormControl('', Validators.required),
    branchOwnerPan: new FormControl('', Validators.required),
    branchDocument: new FormControl(),
    branchRegistrationNumber: new FormControl('', Validators.required),
    branchRegistrationDate: new FormControl(),
  });

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  setPreview(event: Event) {
    const files = this.imageFile.nativeElement.files;
    if (files.length == 0) return;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.image = reader.result;
    };
  }
  handleSubmitData(event: any) {
    console.log('handle submit called');

    const orgData = {
      applicantType: this.createOrgForm.controls['applicantType'].value,
      name: this.createOrgForm.controls['name'].value,
      uniqId: this.createOrgForm.controls['uniqId'].value,
      branchName: this.createOrgForm.controls['branchName'].value,
      branchAddress: this.createOrgForm.controls['branchAddress'].value,
      branchCity: this.createOrgForm.controls['branchCity'].value,
      branchState: this.createOrgForm.controls['branchState'].value,
      branchTelephone: this.createOrgForm.controls['branchTelephone'].value,
      branchEmail: this.createOrgForm.controls['branchEmail'].value,
      branchOwnerName: this.createOrgForm.controls['branchOwnerName'].value,
      branchOwnerTelephone:
        this.createOrgForm.controls['branchOwnerTelephone'].value,
      branchOwnerPan: this.createOrgForm.controls['branchOwnerPan'].value,
      branchDocument: this.branchDocument.nativeElement.files[0],
      branchRegistrationNumber:
        this.createOrgForm.controls['branchRegistrationNumber'].value,
      branchRegistrationDate:
        this.createOrgForm.controls['branchRegistrationDate'].value,
    };

    this.orgService
      .postOrganizationForRegistration(orgData)
      .subscribe((data) => {
        console.log(data);
      });

    this.openSnackBar(`Your request for ${orgData.name} is stored`, 'close');
  }
}
