import { Component, ElementRef, Input, OnChanges, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {  Chart, registerables, ChartType } from 'node_modules/chart.js'
import { take } from 'rxjs/operators';
import { SurveyService } from 'src/app/shared/services/survey.service';

@Component({
  selector: 'app-survey-chart',
  templateUrl: './survey-chart.component.html',
  styleUrls: ['./survey-chart.component.scss']
})
export class SurveyChartComponent implements OnInit, OnChanges   {

  charts: any;
  @Input() ChartDataIndex:any; // grabbing index from survey-collect

  @ViewChildren('canvas', { read: ElementRef }) elementRef!: QueryList<ElementRef>;

  surveysData:any = []

  

  constructor(    
      public _survey:SurveyService,
      ) {
    Chart.register(...registerables);
   }

  surveyData : any[] = []
  chartData : any[] =[]



  ngOnInit(): void {

  }

  ngOnChanges() {
    this.setChart();
  }

  setChart(){

    
    let arrLabel: any[] = []
    let arrData: any[] = []

  // console.log(this._survey.chartQuery$[this.ChartDataIndex])

    //accompanying info for surveyCharts
  this.surveyData = this._survey.chartQuery$[this.ChartDataIndex].filter((item: { questionType: string; }) => item.questionType !== "Free Text" )
    

  // console.log(this.surveyData)
  arrLabel = this._survey.chartQuery$[this.ChartDataIndex].filter((item: { questionType: string; }) => item.questionType !== "Free Text" )
    .map((a:any) => {
      if(a.length !== 0 ){
         const arrLabelAnswers = a.answers.map((b:any) => 
            b.answer
          )
          return arrLabelAnswers
      }
    })


    const chartCalcArr:any = this._survey.calcArr$[this.ChartDataIndex]
    let idArr:any[] = []

    //* SECTION OFF calcArr BY ID */
    idArr = this._survey.calcArr$[this.ChartDataIndex].map((a:any, index: number) => 
      chartCalcArr.filter((idKey: { id: any; }) => idKey.id == a.id) 
    )

    //** REMOVING DULPLICATES GENERATED FROM MAP */
    const ids = idArr.map((a:any) => 
      a[0].id  //return array of each id:# 
    )

    const filteredArr = idArr.filter(([{id}], index) => !ids.includes(id, index + 1)).filter(([item]) => item.questionType !== "Free Text" ) //suffering

    //* FETCHING VALUE FROM FILTERED ARRAY */
    arrData = filteredArr.map(a=> 
      a.map((b:any) => 
        b.value
      )
    )
  
    filteredArr.map((a, index)=> {

      this.chartData.push({
        labels:arrLabel[index],
        datasets:[{
          label: '# of Answers',
          data:arrData[index],
          borderColor:'red',
          backgroundColor: 'rgba(239, 118, 160, 1)'
          // fill:falseCanvasRenderingContext2D
        }]
      }) 

    }

    )

    const baseConfig: any = {
        type: 'bar',
        options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
        }
        }

    setTimeout(() => {


      let arrLength:number[] = []
      this._survey.chartQuery$.forEach(a => {
       arrLength.push(a.length)
      })


      // cross reference chartQuery to number times chartjs needs to appear for ngfor

    // console.log(this.ChartDataIndex,"this.ChartDataIndex")
    // console.log(this.chartData,"this.chartData")
      this.charts = this.elementRef.map((elementRef, index) => {  

        const config = Object.assign({}, baseConfig, { data: this.chartData[index] });
        
        return new Chart(elementRef.nativeElement, config) as Chart;
      });



    }); 


  }

  }




