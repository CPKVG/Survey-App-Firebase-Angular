import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomeComponent } from './components/home/home.component';


//AngularFire
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { environment } from '../environments/environment';

import { LogService } from './shared/log.service';
import { LogTestComponent } from './log-test/log-test.component';

import { SurveyComponent } from './components/survey/survey.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthService } from './shared/services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { SurveyService } from './shared/services/survey.service';


@NgModule({ 
  declarations: [
    AppComponent,
    LogTestComponent,
    SurveyComponent,

    DashboardComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    HomeComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    
  ],
  providers: [
    LogService,
    AuthService, 
    SurveyService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
