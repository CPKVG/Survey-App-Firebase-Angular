import { Component, Input, OnInit, Query } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SurveyService } from 'src/app/shared/services/survey.service';


// export interface Survey { 
//   name: string;
//   sections:any[]; }
  
// export interface SurveyId extends Survey { id: string; }



@Component({
  selector: 'app-survey-review',
  templateUrl: './survey-review.component.html',
  styleUrls: ['./survey-review.component.scss']
})

export class SurveyReviewComponent implements OnInit {

  constructor(
    public _survey:SurveyService,
    ) {


    }
    ngOnInit(): void {
    }


  // goBack(): void {
  //   this.location.back();
  // }



}
