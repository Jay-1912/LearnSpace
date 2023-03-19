import { OnInit, Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-manage-quiz',
  templateUrl: './manage-quiz.component.html',
  styleUrls: ['./manage-quiz.component.css'],
})
export class ManageQuizComponent implements OnInit {
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      window.location.href = 'http://localhost:4200';
    }
  }

  constructor(private authService: AuthenticationService) {}
}
