import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { PnrStatusComponent } from './pnr-status/pnr-status.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LivetrainStatusComponent } from './livetrain-status/livetrain-status.component';
import { TrainBtwStationsComponent } from './train-btw-stations/train-btw-stations.component';
import { ContactUsService } from './contact-us/contact-us.service';
import { PnrStatusService } from './pnr-status/pnr-status.service';
import { LivetrainStatusService } from './livetrain-status/livetrain-status.service';
import { TrainBtwStationsService } from './train-btw-stations/train-btw-stations.service';
import { AppRoutes } from './app.router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TrainRouteComponent } from './train-route/train-route.component';
import { TrainRouteService } from './train-route/train-route.service';
import { loadingInterceptor } from './loadinginterseptcors';

let appServices = [ContactUsService, PnrStatusService, LivetrainStatusService, TrainBtwStationsService, TrainRouteService,]
let libraryServices = [{
  provide: HTTP_INTERCEPTORS,
  useClass: loadingInterceptor,
  multi: true
}]

@NgModule({
  declarations: [
    AppComponent,
    PnrStatusComponent,
    ContactUsComponent,
    LivetrainStatusComponent,
    TrainBtwStationsComponent,
    TrainRouteComponent
  ],
  imports: [
    BrowserModule, AppRoutes, FormsModule, HttpClientModule, AngularFontAwesomeModule,NgbModule.forRoot()
  ],
  providers: [appServices, libraryServices],
  bootstrap: [AppComponent]
})


export class AppModule { }
