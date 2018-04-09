import { Component, OnInit } from '@angular/core';
import {LivetrainStatusService} from './livetrain-status.service'

@Component({
  selector: 'app-livetrain-status',
  templateUrl: './livetrain-status.component.html',
  styleUrls: ['./livetrain-status.component.css']
})
export class LivetrainStatusComponent implements OnInit {

  constructor(private LivetrainStatusService:LivetrainStatusService) { }
  trainNumber: any;
  responseObj:object;
  Date:string;
  ngOnInit() {
  }
  getLiveTrainStatus() {
    if (this.trainNumber) {
      this.Date = '09-04-2018';

      this.LivetrainStatusService.getLiveTrainStatus(this.trainNumber,this.Date).
      subscribe(
        responseObj => (this.responseObj = responseObj,
          console.log(this.responseObj, 'success')),
  
        errormsg => (
          console.log(errormsg.error.error, 'error')
        )
      )
    }
  }
}
