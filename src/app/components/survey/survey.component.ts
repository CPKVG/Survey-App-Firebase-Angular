import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  public bools = ["True","False"] 
  public show = true

  survey!: FormGroup;
  // questionTypes
  questionTypes: any = ['Multichoice', 'Free Text', 'True/False']
 // bool show/hide toggle
  // show = true;


  constructor(private fb: FormBuilder) {

  }
  ngOnInit() {
    this.survey = this.fb.group({
      surveyName: [''],
      sections: this.fb.array([
        this.initSection(),
      ])
    })
  }

    initSection() {
      return this.fb.group({
        question: [''],
        questionDesc: [''],
        questionType: ["Multichoice"],
        answers: this.fb.array([
          this.initAnswer()
          ])
      });
    }

    initAnswer() {
      return this.fb.group({
        answer: [''],
      });
    }

    addSection() {
      const control = this.survey.get('sections') as FormArray;
      control.push(this.initSection());
    }

    // value[0].questionType
    addAnswer(j:any) {
      console.log(j);
      const control = this.survey.get(`sections.${j}.answers`) as FormArray;
      control.push(this.initAnswer());      
    }

    // hide(){
    //   this.show = false
    // }
        //check if true/false questiontype + hide text input/addAnswer btn 

    // changeType(e:any, i:any){
    //   // const control = <FormArray>this.survey.get('sections');
    //   const control = this.survey.get(`sections.${i}.questionType`) as FormArray;
    //   const sectionControl = this.survey.get('sections')
    //   console.log(sectionControl)
    //   if (control.value == "True/False"){
    //     this.show = !this.show;
    //   }else{
    //     this.show = true
    //   }
    //   console.log(control.value)
    // }

    // toggleShow(i:any){
    //   return true
    // }


    // toggleShow(i:number){
    //   if(this.getSections(this.survey)[i].value.questionType == 'True/False'){
        
    //     const control = this.survey.get(`sections.${i}.answers`) as FormArray;

    //     control.clear()
    //     control.push(this.initSection());
    //     //remove answer input except 1
         
    //     // this.getAnswers.clear()

    //     //remove answer input except 1
    //   //   while (control.length > 1) {
    //   //     control.removeAt(1);
    //   //  }
    //   }
    //   return(!this.show)
    //   }


    toggleShow(j:number){

      const control = this.survey.get(`sections.${j}.answers`) as FormArray;

      }

    //   modelChanged(event: any) {

    //     event === "True" ? console.log("true") : console.log("false")
    //     // e === "True" ? creds.controls.label.enable() : creds.controls.label.disable()
    // }


      changeType(i:any){
        
      if(this.getSections(this.survey)[i].value.questionType == 'True/False'){
        const control = this.survey.get(`sections.${i}.answers`) as FormArray;
        console.log(control)
        while (control.length > 1) {
          control.removeAt(i);
       }
       


       }
      }


        resetAnswerSize(i:number){
          const control = this.survey.get(`sections.${i}.answers`) as FormArray;
    
          while (control.length > 1) {
            control.removeAt(i);
         }

        }
        

    getSections(form:any) {
      // console.log(form.get('sections').controls, "getSection");
    // console.log(form.controls.sections.controls)
      return form.controls.sections.controls;
    }

    getAnswers(form:any) {
      // console.log(form.controls.answers.controls);
       return form.controls.answers.controls;
     }

    //  [0].value.questionType
     removeAnswer(j:number){
      const control = this.survey.get(`sections.${j}.answers`) as FormArray;
      // console.log(control.value,"control")
      control.removeAt(control.value.length - 1); // only want to remove last input
   }


 
   removeSection(i:number){
    const control = this.survey.get('sections') as FormArray;
    control.removeAt(i);
 
   }

   onSubmit(form:any){
     console.log(this.survey.value)
     console.log("submited")
   }
    
  }


function e(e: any, i: any) {
  throw new Error('Function not implemented.');
}

