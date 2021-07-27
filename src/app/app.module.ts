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



// import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
// import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { LogService } from './shared/log.service';
import { LogTestComponent } from './log-test/log-test.component';

import { SurveyComponent } from './components/survey/survey.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthService } from './shared/services/auth.service';
import { HomepageComponent } from './components/homepage/homepage.component';


// import { AuthService } from "./shared/services/auth.service";


// const config = {
//   apiKey: "AIzaSyA0DVIg-lHKdXkYo4IJA8AmdAEYelkbor8",
//   authDomain: "survey-cms-app.firebaseapp.com",
//   projectId: "survey-cms-app",
//   storageBucket: "survey-cms-app.appspot.com",
//   messagingSenderId: "1061952103414",
//   appId: "1:1061952103414:web:96ccdf9552125cd2019dd7",
//   measurementId: "G-5BZJP4BHYP"
// };



@NgModule({ 
  declarations: [
    AppComponent,
    // HomeComponent,
    LogTestComponent,
    SurveyComponent,

    DashboardComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    HomepageComponent,

    
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
  providers: [LogService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
