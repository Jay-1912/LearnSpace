import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // hitting trial endpoint
    this.http.get('api/trial').subscribe((data) => {
      console.log(data);
    });
  }

  title = 'LearnSpace';

  constructor(private http: HttpClient) {}
}
