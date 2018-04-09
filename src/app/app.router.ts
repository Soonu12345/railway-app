import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PnrStatusComponent } from './pnr-status/pnr-status.component';
import { TrainBtwStationsComponent } from './train-btw-stations/train-btw-stations.component';
import { LivetrainStatusComponent } from './livetrain-status/livetrain-status.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TrainRouteComponent } from './train-route/train-route.component';

const routes = [
    {path: 'pnr-status', component: PnrStatusComponent},
    {path: 'train-btw-stations', component: TrainBtwStationsComponent},
    {path: 'livetrain-status', component: LivetrainStatusComponent},
    {path: 'contact-us', component: ContactUsComponent},
    {path: 'train-route', component: TrainRouteComponent},
    {path:'', redirectTo:'pnr-status', pathMatch:'full'}
]

@NgModule({
    exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutes {}