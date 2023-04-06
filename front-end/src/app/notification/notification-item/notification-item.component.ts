import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { NotificationService } from 'src/app/services/notification.service';
import { QuizService } from 'src/app/services/quiz.service';
import { INotification } from 'src/app/shared/interface';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {
  
  constructor(private quizService:QuizService ,private notificationService:NotificationService, private courseService:CourseService){}

  @Input() notification!:string;

  title:string ="";
  time:string="";

  ngOnInit(): void{
    this.notificationService.getNotificationById(this.notification).subscribe((res)=>{
      if(res){
        if(res.type==="add_course"){
          this.courseService.getCourseByID(res.dataId).subscribe((course)=>{
            console.log(course[0]);
            this.title = "New course is added in your organization: '"+course[0].title+"'";
            this.time = res.date.substring(0,10);
          })
        }

        if(res.type==="assign_marks"){
          this.quizService.getQuizById(res.dataId).subscribe((res2)=>{
            this.title = "Quiz Returned: " + res2.quiz.title;
            this.time = res.date.substring(0,10);
          })
        }
      }
    })
  }

}
