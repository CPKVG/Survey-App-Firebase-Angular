import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, map, switchMap, filter } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-survey-url',
  templateUrl: './survey-url.component.html',
  styleUrls: ['./survey-url.component.scss']
})
export class SurveyUrlComponent implements OnInit {

  public bools = ["True","False"] 

  items:any;
  surveyCol!: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private _survey:SurveyService,
    private fb: FormBuilder, 
  ) {}

  
  ngOnInit(){
    this.initSurvey()


    const routeId = String(this.route.snapshot.paramMap.get('id'))
    
    const getSurvey = this._survey.getSurvey(routeId).pipe(
        map( a => a.filter((item: any) => typeof item !== 'undefined') 
    ))
    
    return getSurvey.subscribe(i => {

        this.items = i[0];
      
          // this.items.sections.map((b:any) =>{
          //   if(b.questionType == "True/False"){
          //     this.showBool = true
          //     console.log("bool = true")
          //   }else if(b.questionType == "Free Text"){
          //     this.showInput = true
          //     console.log("showInput = true")
          //   }
          // })
          
      })
  }

  initSurvey(){
    this.surveyCol = this.fb.group({
      surveyName: [''], //get from existing db
      surveySubmittedDate: [''], //when data was submited
      id:[''],
      sections:this.fb.array([
        this.initSection(),
      ])
    })
  }
  initSection(){
    return this.fb.group({
      question: [''],
      answer:['']
    })
  }


  onSubmit(survey: any){
    console.log("submitted")
  }

  getSections(form:any) {
    // console.log(form.get('sections').controls, "getSection");
  // console.log(form.controls.sections.controls)
    return form.controls.sections.controls;
  } 

  getAnswers(form:any) {
    // console.log(form.controls.answers.controls);
     return form.controls.answer.controls;
   }


}

