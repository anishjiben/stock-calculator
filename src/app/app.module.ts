import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {StockCalculatorService} from './stock-calculator.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    InputTextModule
  ],
  providers: [StockCalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
