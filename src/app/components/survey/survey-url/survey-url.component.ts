import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, map, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-survey-url',
  templateUrl: './survey-url.component.html',
  styleUrls: ['./survey-url.component.scss']
})
export class SurveyUrlComponent implements OnInit {

  items:any;

  constructor(
    private route: ActivatedRoute,
    private _survey:SurveyService
  ) {}

  
  ngOnInit(){

    const routeId = String(this.route.snapshot.paramMap.get('id'))

    const getSurvey = this._survey.getSurvey(routeId)
      .pipe(map(apps => apps.filter((item: any) => typeof item !== 'undefined')))
    
    return getSurvey.subscribe( i => {
        this.items = i[0];

      })
    
  }
}

