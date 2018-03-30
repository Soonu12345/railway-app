import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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

let appServices = [ContactUsService, PnrStatusService, LivetrainStatusService, TrainBtwStationsService]

@NgModule({
  declarations: [
    AppComponent,
    PnrStatusComponent,
    ContactUsComponent,
    LivetrainStatusComponent,
    TrainBtwStationsComponent
  ],
  imports: [
    BrowserModule, AppRoutes
  ],
  providers: appServices,
  bootstrap: [AppComponent]
})


export class AppModule { }
