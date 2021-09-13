import { Component, OnDestroy, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/shared/services/survey.service';
  // import 'rxjs/Rx' ;
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-survey-collect',
  templateUrl: './survey-collect.component.html',
  styleUrls: ['./survey-collect.component.scss']
})
export class SurveyCollectComponent implements OnInit {

  getSurvey$: any;

  show:boolean = false;
  showDetails:boolean[]=[];
  showData:any[] = [];

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
    if(confirm("Are you sure to delete this survey?")) { /*delete survey confirmation */
    this._survey.deleteUserSurvey(url)
    }
  }

  //****Download raw data into formatt types*****
  surveyDownloadTxtBtn(data:any,i:number){
    const type = "txt"
    const json = this._survey.calcArr$[i]
    const id = data.uid
    this.surveyDownload(type, id, json )
    // this.surveyDownload(i, type, data)
  }

  surveyDownloadCsvBtn(data:any,i:number){
    const type = "csv"
    const cvs = this.jsonToCvsConverter(this._survey.calcArr$[i])
    // this.surveyDownload(i, type, data)
    const id = data.uid

    this.surveyDownload(type, id, cvs )


  }

  surveyDownloadType(type:string){
    let typeObj = {}  
    if(type == "txt"){
      return typeObj = { type: 'application/json' }
    }
    if(type == "cvs"){
      return typeObj = { type: 'text/csv' }
    }
    return typeObj
  }

  // surveyDownload(i:number,type:string, data:any){
  //   const typeObj = this.surveyDownloadType(type);
  //   const fileName = data.uid + "."+ type;
  //   const blob = new Blob([JSON.stringify(this._survey.calcArr$[i])], typeObj); 

  //   var a = document.createElement("a");
  //   a.href = URL.createObjectURL(blob);
  //   a.download = fileName;
  //   a.click();
  // }

    surveyDownload(type:string, id: string, data: any){
    const typeObj = this.surveyDownloadType(type);
    const fileName = id  + "."+ type;

     const blob = new Blob([JSON.stringify(data)], typeObj); 
    // const fileName = data.uid + "."+ type;
    // const blob = new Blob([JSON.stringify(this._survey.calcArr$[i])], typeObj); 

    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
  }


  jsonToCvsConverter(data:any){ // shove this into a new service for files/formats?
    console.log(data,"daata")

    // 0: {question: 'quetion1', answer: 'answer1', value: 1}
    // 1: {question: 'quetion1', answer: 'answer2', value: 0}
    // 2: {question: 'quetion1', answer: 'answer3', value: 1}

    // to 

    //question, answer, value 
    //quetion1, answer1, 1
    //quetion1, answer2, 0
    //quetion1, answer3, 1
  



  const header = Object.keys(data[0])  //get item keys from object array for csv header
  const replacer = (key: any, value: null) => value === null ? '' : value // null values
  const csv = [
    header.join(','), // header row first
    ...data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n')

  console.log(csv)
  return csv

  }

}
