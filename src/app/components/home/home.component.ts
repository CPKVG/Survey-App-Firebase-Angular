import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  surveyForm = this.fb.group({
    question:['' , Validators.required],
    answers: this.fb.array([
      this.fb.control('')
    ])
  })

  // formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }


  get answers() {
    return this.surveyForm.get('answers') as FormArray;
  }
  
  addAnswers() {
    this.answers.push(this.fb.control(''));
  }

  onSubmit() {
    // console.log(this.formGroup.value);
    console.log(this.surveyForm.value)
  }


}
