# Angular-Survey-App
Content management system for creating surveys for private deployment. 

### Features 

* The survey can be customised by answer type (true/false, free text and multichoice). 
  <details>
  <summary><b>Click to see example!&#x1F53B;</b></summary>
  <img src = "https://github.com/CPKVG/Survey-App-Firebase-Angular/blob/main/src/images/readMe_gifs/survey_create_example.gif" alt="survey create example" width = "60%">
  </details>
* Oauth login/signout with Google 
  <details>
  <summary><b>Click to see example!&#x1F53B;</b></summary>
  <img src="https://github.com/CPKVG/Survey-App-Firebase-Angular/blob/main/src/images/readMe_gifs/signin-0auth.gif" alt="signin-0auth example" width="75%">
  </details>
* Download data in CVS or JSON formatt 
  <details>
  <summary><b>Click to see example!&#x1F53B;</b></summary>
  <img src="https://github.com/CPKVG/Survey-App-Firebase-Angular/blob/main/src/images/readMe_gifs/survey_download_and_del_example.gif" alt="download & del example" width = "80%">
  </details>
* Set to dynamically POST/GET forms using mix of form builder/template forms + routing.
* Reactive/tempalte form with the scope of *ngFor.
  <details>
  <summary><b>Click to see example!&#x1F53B;</b></summary>
  <img src="https://github.com/CPKVG/Survey-App-Firebase-Angular/blob/main/src/images/readMe_gifs/survey_user_input_example.gif" alt="survey user input example" width = "80%">
  </details>
* User's dashboard to create, read and delete deployed surveys.
* Read survey results, date of submission and number of participants.
* Automatically generate charts for data visualisation. 
  <details>
  <summary><b>Click to see example!&#x1F53B;</b></summary>
  <img src="https://github.com/CPKVG/Survey-App-Firebase-Angular/blob/main/src/images/readMe_gifs/survey_dashboard_example.gif" alt = "survey dashboard example" width = "80%">
  </details>

### Planned features [x]implemented
* [x]ad Hoc data download in csv or json formatt 
* [x]Chart generation 
* [x]Bug fixes
* [x]Data verification 
* [x]Delete survey confirmation 
* Mannual signin + login 
* Account recovery 

## Installation
* Generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.3.
* [Firebase](https://firebase.google.com/) utilised as its backend as a service
### Dependancies
* [AngularFire](https://github.com/angular/angularfire) version 7.0.
* [chartjs](https://github.com/chartjs/Chart.js/releases/tag/v3.5.1) version 3.5.1.

```
npm install firebase @angular/fire --save
```

### Firebase ConfigAPI

You need to create an account with firebase, start by making a project and retrive it's API

Insert the API in : ```environment.ts```

```
export const environment = {
  production: false,
  firebase:{
    apiKey: "xxxxxx",
    authDomain: "xxxxxx",
    projectId: "xxxxxx",
    storageBucket: "xxxxxx",
    messagingSenderId: "xxxxxx",
    appId: "xxxxxx",
    measurementId: "xxxxxx"
  }
};
```
Enable Google login under `Authentication tab` => `Sign in method`

