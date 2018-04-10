import { Component, OnInit } from '@angular/core';
import { LivetrainStatusService } from './livetrain-status.service'

@Component({
  selector: 'app-livetrain-status',
  templateUrl: './livetrain-status.component.html',
  styleUrls: ['./livetrain-status.component.css']
})
export class LivetrainStatusComponent implements OnInit {

  constructor(private LivetrainStatusService: LivetrainStatusService) { }
  trainNumber: any;
  responseObj: object;
  res:any;
  liveData: object;
  trainNumberExistance:boolean;
  Date: string;
  ngOnInit() {
  }
  getLiveTrainStatus() {
    if (this.trainNumber) {
      this.trainNumberExistance = false;
      this.Date = '10-04-2018';
      this.LivetrainStatusService.getLiveTrainStatus(this.trainNumber, this.Date).
        subscribe(
        responseObj => (this.responseObj = responseObj,
          this.liveData = responseObj),
        errormsg => (
          console.log(errormsg.error.error, 'error')
        )
        )
    } else {
      this.trainNumberExistance = true;
    }
  }
}
