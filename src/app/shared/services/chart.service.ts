import { Injectable } from '@angular/core';
import { SurveyService } from './survey.service';



@Injectable({
  providedIn: 'root'
})
export class ChartService {

  chart$:any;
  chartData: any[] = []

  constructor(
    public _survey:SurveyService,
    ) {

      const baseConfig: any = {
        type: 'bar',
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
      };

   }

 

   convertChart(){
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
                fill:false
              }]
            });
          }
  
        });
  
      }

    })
  return this.chartData
   }
   

}
