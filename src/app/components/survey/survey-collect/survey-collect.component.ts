import { Component, OnDestroy, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { map,take } from 'rxjs/operators';
import { FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-survey-collect',
  templateUrl: './survey-collect.component.html',
  styleUrls: ['./survey-collect.component.scss']
})
export class SurveyCollectComponent implements OnInit {

  getSurvey$: any;
  show:any;

  constructor(
    public _survey:SurveyService,
  ) { }

  ngOnInit(): void {
    
  }

  testCol(url: string, index:any){

    this.showItems(index)

    return this._survey.getSurveyDetail(url)
  }

  showItems(index:number){
    this.show = index;
  }




}
