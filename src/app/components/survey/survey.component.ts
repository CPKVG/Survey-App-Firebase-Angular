import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SurveyService } from 'src/app/shared/services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  public bools = ["True","False"] 

  public boolAnswers = [
    {
      "answer": "True"
    },
    {
      "answer": "False"
    }

  ]

  public show:boolean = false;

  survey!: FormGroup;

  // questionTypes
  questionTypes: any = ['Multichoice', 'Free Text', 'True/False']


  constructor(
    private fb: FormBuilder, 
    private _survey:SurveyService, // for user data storage
    // private afs: AngularFirestore,
  ){
  }
  ngOnInit() {
    // console.log(this._survey.surveyId,"(this._survey.surveyId)")
    this.survey = this.fb.group({
      surveyName: [''],
      surveyDate: [''],
      sections: this.fb.array([
        this.initSection(),
      ])
    })
  }

    // initSurvey(){
    //   this.survey = this.fb.group({
    //     surveyName: [''],
    //     surveyDate: [''],
    //     // surveyId:[''], //retriving for surveyUrl
    //     sections: this.fb.array([
    //       this.initSection(),
    //     ])
    //   })
    // }

    initSection() {
      return this.fb.group({
        question: [''],
        questionDesc: [''],
        questionType: ["Multichoice"],
        answers: this.fb.array([
          this.initAnswer()
          ])
      });
    }

    initAnswer() {
      return this.fb.group({
        answer: [''],
      });
    }

    //for bool
    addAnswerBool(data:any){
      return this.fb.group({
        answer: [data],
      });
    }

    removeAnswerBool(j:number){
      const control = this.survey.get(`sections.${j}.answers`) as FormArray;
      // console.log(control.value,"control")
      control.removeAt(control.value.length - 2); // only want to remove last input
    }


    addSection() {
      const control = this.survey.get('sections') as FormArray;
      control.push(this.initSection());
    }

    // value[0].questionType
    addAnswer(j:number) {
      console.log(j,"index to add number")
      // console.log(j);
      const control = this.survey.get(`sections.${j}.answers`) as FormArray;
      control.push(this.initAnswer());      
    }


    changeType(i:number){
      const control = this.survey.get(`sections.${i}.answers`) as FormArray;

    if(this.getSections(this.survey)[i].value.questionType == 'True/False'){

      control.clear(); // clear out previous populated value 

      if(control.length == 0){
        control.push(this.addAnswerBool('True'))
        control.push(this.addAnswerBool('False')) 
      }


      }else if(this.getSections(this.survey)[i].value.questionType == 'Free Text'){
        control.clear();
        control.push(this.addAnswerBool(''))
      }else{
        control.clear();
        this.addAnswer(i)

      }
    }

  
    getSections(form:any) {
      // console.log(form.get('sections').controls, "getSection");
    // console.log(form.controls.sections.controls)
      return form.controls.sections.controls;
    }

    getAnswers(form:any) {
      // console.log(form.controls.answers.controls);
       return form.controls.answers.controls;
     }

    //  [0].value.questionType
     removeAnswer(j:number){
      const control = this.survey.get(`sections.${j}.answers`) as FormArray;
      // console.log(control.value,"control")
      control.removeAt(control.value.length - 1); // only want to remove last input
   }


 
   removeSection(i:number){
    const control = this.survey.get('sections') as FormArray;
    control.removeAt(i);
 
   }

   setDate() { //retrive current date
    
    this.survey.patchValue({
      surveyDate: new Date(),
    });
  }

  // setUid(){
  //   this.survey.patchValue({
  //     surveyId: this._survey.surveyId
  //   });
  // }



   onSubmit(form:any){
    this.setDate()
    let data = this.survey.value  
    console.log("i am submitted")
    this._survey.createUserSurvey(data)
   }


  callToAction(){
    this.show = true
  }
  

  }
