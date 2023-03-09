import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organization-table',
  templateUrl: './organization-table.component.html',
  styleUrls: ['./organization-table.component.css']
})
export class OrganizationTableComponent implements OnInit {
  constructor(private organizationService:OrganizationService){}
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  organizations$:any[] = [];
  displayTable: boolean = false;
  
  handleDeleteOrg(id:string){
    this.organizationService.deleteOrganization(id).subscribe( (res)=>{
      console.log(res);
      location.reload();
    } )
  }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.organizationService.getOrganization().subscribe( (res)=>{
      this.organizations$ = res;
      this.displayTable = true;
    })
  }
}
