import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material.module';
import { MatPaginatorModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { TimeSheetService } from './services/time-sheet.service';
import { AppComponent } from './app.component';
import { SummaryComponent } from './components/summary/summary.component';
import { SummaryDayDetailsComponent } from './components/summary-day-details/summary-day-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { TableDayDetailsComponent } from './components/table-day-details/table-day-details.component';
import {AppRoutes} from './app. routes';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatusbarComponent } from './components/statusbar/statusbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyHttpInterceptor } from './my-http-interceptor';
// import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { Database } from './services/database';
import { TableDayContainerComponent } from './container/table-day-container/table-day-container.component';
import { CheckboxComponent } from './ui/checkbox/checkbox.component';
import { TableWorkdaysComponent } from './components/table-workdays/table-workdays.component';
import { FormCommentsComponent } from './components/form-comments/form-comments.component';
import { FlybuttonComponent } from './ui/flybutton/flybutton.component';
import { SwipeButtonInnerComponent } from './ui/swipeButtonInner/swipeButtonInner.component';
import { SwipeTimePickerComponent } from './ui/swipe-time-picker/swipe-time-picker.component';




@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    SummaryDayDetailsComponent,
    DashboardComponent,
    // TableDayDetailsComponent,
    FormModalComponent,
    StatusbarComponent,
    TableDayContainerComponent,
    CheckboxComponent,
    TableWorkdaysComponent,
    FormCommentsComponent,
    FlybuttonComponent,
    SwipeButtonInnerComponent,
    SwipeTimePickerComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule, MatPaginatorModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutes,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    TimeSheetService,
    // { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [FormModalComponent, StatusbarComponent, FormCommentsComponent]
})
export class AppModule { }
