import { Component, OnDestroy, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { map,take } from 'rxjs/operators';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-survey-url',
  templateUrl: './survey-url.component.html',
  styleUrls: ['./survey-url.component.scss']
})

//I have sepent an ungodly amount of time on this. 
//total revision count = 5

export class SurveyUrlComponent implements OnInit{

  public bools = ["True","False"] 

  surveyForm!: FormGroup; //template for form => POST => Firebase
  surveyGet: any; //generate template form with, Firebase => GET => Form
  dataModel$: any;
  getSurvey$: any;


  // retrievedData:any;

  constructor(
      
    private route: ActivatedRoute,
    private _survey:SurveyService,
    private fb: FormBuilder, 
  ) {}



  ngOnInit(){



    this.dataModel$ = Object.create(null); 
    const routeId = String(this.route.snapshot.paramMap.get('id'))
    console.log(routeId)
    
    this.getSurvey$ = this._survey.getSurvey(routeId).pipe(take(1), 
        map( a => a.filter((item: any) => typeof item !== 'undefined') 
    )).subscribe(a => this.initFormGroup(a))
    

    this.surveyForm = this.fb.group({
      surveyName: [''],
      surveyDate: [''],
      uid:[''],
      sections: this.fb.array([
        
      ])
    })


  }

  //convert data fetched from firebase into formbuilder
  initFormGroup(data:any) {

    const control = this.surveyForm.get(`sections`) as FormArray;

    Object.keys(data).forEach((i:any) => {
      this.surveyForm.patchValue({
        uid:(data[i].id),
        surveyName:(data[i].surveyName),
        sections: [
        //   {question:(data[i].sections[b].question)}
        ]
        })

        Object.keys(data[i].sections).forEach((b:any) => {
          control.push(this.fb.group({
            question:(data[i].sections[b].question),
            questionDesc: [data[i].sections[b].questionDesc],
            questionType: [data[i].sections[b].questionType],
            selectedAnswer:[''],
            answers:[data[i].sections[b].answers]
          }))


      })

        
    })

      return this.surveyGet = data
    }



  onSubmit(value:any) {


    let x = (this.surveyForm.controls['sections']) as FormArray


    Object.keys(this.surveyForm.value.sections).forEach((a:any) => {
      let y = (x.controls[a])
      y.patchValue({
        selectedAnswer:Object.values(value[a]).toString()
    })


    })

    //set date of submission
    this.surveyForm.patchValue({
      surveyDate: new Date(),
    });

    //post data to firebase w survey service
    let data = this.surveyForm.value
    this._survey.createCollectionSurvey(data)
    
  }

}
