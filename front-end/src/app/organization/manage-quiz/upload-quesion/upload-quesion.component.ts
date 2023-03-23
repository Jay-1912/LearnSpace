import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-quesion',
  templateUrl: './upload-quesion.component.html',
  styleUrls: ['./upload-quesion.component.css']
})
export class UploadQuesionComponent implements OnInit{
  panelOpenState = false;
  quizForm: FormGroup; 
  selectorArrForCorrectOptions: any[] = []; 
  quizId!:any;
  questions:any[] = [];
  isEdit:boolean = false;
  editIndex!:number;
     
  constructor(private _snackBar: MatSnackBar,private route:ActivatedRoute,private fb:FormBuilder, private quizService:QuizService) {  
     
    this.quizForm = this.fb.group({  
      question: '',  
      correct_option: -1,
      options: this.fb.array([]) ,  
    });  
  }  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
    
  options() : FormArray {  
    return this.quizForm.get("options") as FormArray  
  }  
     
  newOption(): FormGroup {  
    return this.fb.group({  
      option_text: ""  
    })  
  }  

  handleCorrectOption(){
    this.selectorArrForCorrectOptions = this.options().value;
  }
     
  addOption(event: Event) {
    event.preventDefault();  
    this.options().push(this.newOption());
    this.selectorArrForCorrectOptions = this.options().value;
  }  
     
  removeOption(i:number) {  
    this.options().removeAt(i);  
    this.selectorArrForCorrectOptions = this.options().value;
  } 

  setFormValues(index: number){
    this.editIndex = index;
    this.isEdit = true;
    let question = this.questions[index];
    this.quizForm.controls["question"].setValue(question.question);
    while(this.options().length !== 0){
      this.options().removeAt(0);
    }
    for(let option of question.options){
      this.options().push(this.fb.group({  
        option_text: ""
      }))
    }
    this.quizForm.controls["options"].setValue(question.options);
    this.selectorArrForCorrectOptions = this.options().value;
    this.quizForm.controls["correct_option"].setValue(question.correct_option);
  }

  updateQuestion(event: Event){
    event.preventDefault();
    let formData = new FormData();
    formData.append("index",  this.editIndex.toString());
    formData.append("question", this.quizForm.value.question);
    formData.append("options", JSON.stringify(this.quizForm.value.options));
    formData.append("correct_option", this.quizForm.value.correct_option);
    this.quizService.updateQuestion(this.quizId, formData).subscribe((res)=>{
      if(res.quiz){
        this.questions = res.quiz.questions;
      }
      if(res.code==200){
        console.log(res);
        this.openSnackBar(res.message, "close");
      }else{
        this.openSnackBar(res.message, "close");
      }
      this.isEdit = false;
    })
  }

  handleDeleteQuestion(index: number){
    this.quizService.deleteQuestion(this.quizId, index).subscribe( (res)=>{
      if(res.quiz){
        this.questions = res.quiz.questions;
      }
      if(res.code==200){
        this.openSnackBar(res.message, "close");
      }else{
        this.openSnackBar(res.message, "close");
      }
    })
  }

  saveQuestion(event: Event){
    event.preventDefault();
    let formData = new FormData();
    formData.append("question", this.quizForm.value.question);
    formData.append("options", JSON.stringify(this.quizForm.value.options));
    formData.append("correct_option", this.quizForm.value.correct_option);
    this.quizService.postQuestion(this.quizId, formData).subscribe((res)=>{
      if(res.quiz){
        this.questions = res.quiz.questions;
      }
      if(res.code==200){
        console.log(res);
        this.openSnackBar(res.message, "close");
      }else{
        this.openSnackBar(res.message, "close");
      }
    })
  }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id');
    this.quizService.getQuizById(this.quizId).subscribe((res)=>{
      console.log(res);
      this.questions = res.quiz.questions;
    })
  }
}
