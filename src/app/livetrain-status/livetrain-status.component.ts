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
  responseObj: any;
  res: any;
  liveData: Array<object>;
  trainNumberExistance: boolean;
  Date: string;
  today: any;
  dd: any;
  mm: any;
  yyyy:any;
  reqDate:any;
  ngOnInit() {
  }
  getLiveTrainStatus() {
    if (this.trainNumber) {
      this.trainNumberExistance = false;

      this.today = new Date();
      this.dd = this.today.getDate();
      this.mm = this.today.getMonth() + 1; //January is 0!
      this.yyyy = this.today.getFullYear();
      if (this.dd < 10) {
        this.dd = '0' + this.dd;
      }
      if (this.mm < 10) {
        this.mm = '0' + this.mm;
      }
      this.reqDate = this.dd + '-' + this.mm + '-' + this.yyyy;
      let index;
      let reqTrainNumber = this.trainNumber.trim();
      this.LivetrainStatusService.getLiveTrainStatus(reqTrainNumber, this.reqDate).
        subscribe(
        responseObj => (this.responseObj = responseObj,

          (this.responseObj.route && this.responseObj.route.length > 0) ?
            (index = this.responseObj.route.findIndex(
              img => img.station.code === this.responseObj.current_station.code),
              console.log(index),
              this.liveData = this.responseObj.route.splice(index)

            ) : 'dd'
        ),
        errormsg => (
          console.log(errormsg.error.error, 'error')
        )
        )
    } else {
      this.trainNumberExistance = true;
    }
  }
}
