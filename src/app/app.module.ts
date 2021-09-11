import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Storage } from '@ionic/storage';
import { AddCookieInterceptorService } from './services/add-cookie.interceptor.service';
import { TimesheetItemPipe } from './timesheet-item.pipe';

@NgModule({
  declarations: [AppComponent, TimesheetItemPipe],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(),
    AppRoutingModule],
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: HTTP_INTERCEPTORS, useClass: AddCookieInterceptorService, multi: true }, Storage, HTTP, Geolocation],
  bootstrap: [AppComponent],
})
export class AppModule {}
