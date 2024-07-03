import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './components/profile/profile.component';
import { ChargingListComponent } from './components/charging-list/charging-list.component';
import { ChargerDetailComponent } from './components/charger-detail/charger-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApiInterceptorInterceptor } from './api-interceptor.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavBarComponent,
    ProfileComponent,
    ChargingListComponent,
    ChargerDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
