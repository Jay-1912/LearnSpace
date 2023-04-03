import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { INotification } from '../shared/interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notifications:any[] = [];

  constructor(private notificationService:NotificationService){}

  ngOnInit(): void{
  }

}
