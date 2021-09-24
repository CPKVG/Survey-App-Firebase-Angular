
# Angular-Survey-App
Content management system for creating surveys for private deployment. 

### Features 
* The survey can be customised by answer type (true/false, free text and multichoice). 
* Oauth login/signout with Google 
* User's dashboard to create, read and delete deployed surveys.
* Read survey results, date of submission and number of participants.
* Set to dynamically POST/GET forms using mix of form builder/template forms + routing.
* Reactive/tempalte form with the scope of *ngFor.


### Planned features [x]implemented
* [x]ad Hoc data download in csv or json formatt 
* Chart generation 
* Bug fixes
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

