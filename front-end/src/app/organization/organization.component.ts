import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  constructor(private authService:AuthenticationService){}
  
  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }
  }
}
