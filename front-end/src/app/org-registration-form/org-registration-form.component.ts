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
  profile!: File;
  constructor(
    private orgService: OrganizationService,
    private _snackBar: MatSnackBar
  ) {}

  applicantTypes = ['individual', 'organization'];
  orgTypes = ['NGO', 'University'];
  @ViewChild('branchDocument') branchDoc!: ElementRef;
  @ViewChild('file') imageFile!: ElementRef;
  @ViewChild('resetBtn') resetBtn!: ElementRef;

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
    branchLogo: new FormControl(),
  });

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  async uploadProfile(event: any) {
    this.profile = event.target.files[0];
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

    const orgData = new FormData();
    orgData.append(
      'applicantType',
      this.createOrgForm.controls['applicantType'].value
    );

    orgData.append(
      'name',
      this.createOrgForm.controls['name'].value!.toString()
    );
    orgData.append(
      'uniqId',
      this.createOrgForm.controls['uniqId'].value!.toString()
    );
    orgData.append(
      'branchName',
      this.createOrgForm.controls['branchName'].value!.toString()
    );
    orgData.append(
      'branchAddress',
      this.createOrgForm.controls['branchAddress'].value!.toString()
    );
    orgData.append(
      'branchCity',
      this.createOrgForm.controls['branchCity'].value!.toString()
    );
    orgData.append(
      'branchState',
      this.createOrgForm.controls['branchState'].value!.toString()
    );
    orgData.append(
      'branchTelephone',
      this.createOrgForm.controls['branchTelephone'].value!.toString()
    );
    orgData.append(
      'branchEmail',
      this.createOrgForm.controls['branchEmail'].value!.toString()
    );
    orgData.append(
      'branchOwnerName',
      this.createOrgForm.controls['branchOwnerName'].value!.toString()
    );
    orgData.append(
      'branchOwnerTelephone',
      this.createOrgForm.controls['branchOwnerTelephone'].value!.toString()
    );
    orgData.append(
      'branchOwnerPan',
      this.createOrgForm.controls['branchOwnerPan'].value!.toString()
    );
    orgData.append(
      'branchRegistrationNumber',
      this.createOrgForm.controls['branchRegistrationNumber'].value!.toString()
    );
    orgData.append(
      'branchRegistrationDate',
      this.createOrgForm.controls['branchRegistrationDate'].value!.toString()
    );
    orgData.append('branchLogo', this.imageFile.nativeElement.files[0]);

    try {
      orgData.append('branchDocument', this.branchDoc.nativeElement.files[0]);
      console.log(this.branchDoc.nativeElement.files[0]);
    } catch (error) {
      console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhere');

      console.log(error);
    }

    this.orgService
      .postOrganizationForRegistration(orgData)
      .subscribe((data) => {
        console.log(data);
        this.openSnackBar(
          `Your request for ${orgData.get('name')} is stored`,
          'close'
        );
      });

    this.resetBtn.nativeElement.click();
  }
}
