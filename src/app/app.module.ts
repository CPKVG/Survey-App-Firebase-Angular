import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { LogService }
    from './shared/log.service';
import { LogTestComponent }
    from './log-test/log-test.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    
  ],
  providers: [LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
