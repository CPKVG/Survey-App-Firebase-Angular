import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomeComponent } from './components/home/home.component';


//AngularFire
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';


import { environment } from '../environments/environment';

import { LogService } from './shared/log.service';
import { LogTestComponent } from './log-test/log-test.component';

import { SurveyComponent } from './components/survey/survey.component';


import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


import { SurveyReviewComponent } from './components/survey/survey-review/survey-review.component';
import { SurveyCollectComponent } from './components/survey/survey-collect/survey-collect.component';
import { SurveyUrlComponent } from './components/survey/survey-url/survey-url.component';
//Pages
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

//Shared
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';

//services
import { SurveyService } from './shared/services/survey.service';
import { AuthService } from './shared/services/auth.service';

@NgModule({ 
  declarations: [
    AppComponent,
    LogTestComponent,
    SurveyComponent,

    DashboardComponent,
    SignUpComponent,
    ForgotPasswordComponent,

    SurveyReviewComponent,
    SurveyCollectComponent,
    SurveyUrlComponent,

    HomeComponent,
    DashboardComponent,

    HeaderComponent,
    FooterComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    
  ],
  providers: [
    LogService,
    AuthService, 
    // SurveyService,
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
