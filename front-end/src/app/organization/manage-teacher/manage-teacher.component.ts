import { OnInit, Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-manage-teacher',
  templateUrl: './manage-teacher.component.html',
  styleUrls: ['./manage-teacher.component.css'],
})
export class ManageTeacherComponent implements OnInit {
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      window.location.href = 'http://localhost:4200';
    }
  }

  constructor(private authService: AuthenticationService) {}
}
