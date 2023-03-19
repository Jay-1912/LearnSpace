import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-lecture-content',
  templateUrl: './lecture-content.component.html',
  styleUrls: ['./lecture-content.component.css']
})
export class LectureContentComponent implements OnChanges {
  @Input() src!:string;
  @Input() type!:string;
  source!:string;
  ngOnChanges(){
    this.source = "http://localhost:3000/images/"+this.src; 
  }
}
