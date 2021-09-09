import { Component, OnDestroy, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/shared/services/survey.service';

import { take } from 'rxjs/operators';



@Component({
  selector: 'app-survey-collect',
  templateUrl: './survey-collect.component.html',
  styleUrls: ['./survey-collect.component.scss']
})
export class SurveyCollectComponent implements OnInit {

  getSurvey$: any;

  // index:number;
  selectedIndex: number | undefined;
  show:boolean = false;
  showDetails:boolean[]=[];
  showData:any[] = [];

  // testArr:any[] = [];
  // queryCount$:any[]=[];
 

  constructor(
    public _survey:SurveyService,
  ) { }

  ngOnInit(): void {
    console.log(this._survey.queryCount$,"count")

    //query via push to showData from _survey.survys, then call getSurveyDetail func for dashboard GET Init'ed 

    this._survey.surveys.pipe(take(1)).subscribe(result => {
      this.showData.push(result)
        this.showData[0].forEach((a:any) =>{
          
          this._survey.getSurveyDetail(a.id)

        })
        // console.log(this._survey.queryCount$, "query count")

    })

  }

  
  toggleDetailBtn(url: string, i: number){
    this.show = true
    this.showDetails[i] = !this.showDetails[i]
  }

  surveyDelete(url: string){
    this._survey.deleteUserSurvey(url)
  }


}
