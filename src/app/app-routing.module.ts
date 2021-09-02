import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Import all the components for which navigation service has to be activated 
import { SignInComponent } from '../app/components/sign-in/sign-in.component';
import { SignUpComponent } from '../app/components/sign-up/sign-up.component';
import { DashboardComponent } from '../app/pages/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../app/components/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { SurveyUrlComponent } from './components/survey/survey-url/survey-url.component';

// import { AuthGuard } from "../app/shared/guard/auth.guard";
// import { VerifyEmailComponent } from '../app/components/verify-email/verify-email.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'verify-email-address', component: VerifyEmailComponent }

  { path: 'survey/:id', component: SurveyUrlComponent }, // generate unique url to share around
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
