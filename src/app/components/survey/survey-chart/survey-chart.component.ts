import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import {  Chart, registerables } from 'node_modules/chart.js'
import { SurveyService } from 'src/app/shared/services/survey.service';


@Component({
  selector: 'app-survey-chart',
  templateUrl: './survey-chart.component.html',
  styleUrls: ['./survey-chart.component.scss']
})
export class SurveyChartComponent implements OnInit, OnChanges   {

  chart!: Chart;
  @Input() ChartDataIndex:any; // grabbing index from survey-collect
  @ViewChild("canvas")
  elementRef!: ElementRef;

  constructor(    
      public _survey:SurveyService,
      ) {
    Chart.register(...registerables);
       

   }

  chartData : any[] =[]


  ngOnInit(): void {
  this.setChart();
  }

  ngOnChanges() {
    this.setChart();
  }

  setChart(){


    this._survey.calcArr$.forEach(a => {
      let arrLabel: any[] = []
      let arrData: any[] = []
      if(a[0].value != undefined){
  
          a.forEach((b:any, index:any) => {
            arrLabel.push(b.answer) // seperate array 
            arrData.push(b.value)
          
          if(index == 0){  /*guard against free text generating graph*/
            this.chartData.push({ 
              labels:arrLabel,
              datasets:[{
                data:arrData,
                borderColor:'red',
                // fill:falseCanvasRenderingContext2D
              }]
            });
          } 
  
        });
      }else{
        this.chartData.push({
          labels:arrLabel,
          datasets:[{
            data:[''], // placeholder index for free text data 
            borderColor:'red',
            // fill:falseCanvasRenderingContext2D
          }]
        }) 
      }

    })


    setTimeout(() => {

      const canvas: any = this.elementRef.nativeElement;
      const ctx = canvas.getContext("2d");

      if (this.chart){
        this.chart.destroy();
      } 
      console.log(this.ChartDataIndex,"this.ChartDataIndex")
      this.chart = new Chart(ctx, {
        type: "bar",
        data: this.chartData[this.ChartDataIndex],
        options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }


      });
      
    });


  }

  }




