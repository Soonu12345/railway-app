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
  noDataFound: boolean;
  loadingFail: boolean;
  trainNumWrong: boolean;
  apiKeyFail: boolean;
  custDatesArr=[{"label":"Today","id":0},{"label":"Yesterday","id":1},{"label":"2 Days ago","id":2},{"label":"3 Days ago","id":3}]
  custDate=this.custDatesArr[0];

  ngOnInit() {
  }

  funcName = (params) => {
    this.today = new Date();
    this.today.setDate(this.today.getDate() - params.id);
    this.today=new Date(this.today);
    console.log(this.today,"this.today")
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
  }




  getLiveTrainStatus() {
    this.apiKeyFail = false;
    this.trainNumWrong = false;
    this.noDataFound = false;
    this.loadingFail = false;
    if (this.trainNumber) {
      this.funcName(this.custDate);
      this.trainNumberExistance = false;
      let index;
      let reqTrainNumber = this.trainNumber.trim();
      this.LivetrainStatusService.getLiveTrainStatus(reqTrainNumber, this.reqDate).
        subscribe(
        responseObj => (this.responseObj = responseObj,
          (this.responseObj.route && this.responseObj.route.length === 0 && this.responseObj.response_code === 500) ? this.apiKeyFail = true: this.apiKeyFail = false, 
          (this.responseObj.route && this.responseObj.route.length === 0 && this.responseObj.response_code === 502) ? this.trainNumWrong = true: this.trainNumWrong = false,
          (this.responseObj.route && this.responseObj.route.length === 0 && this.responseObj.response_code === 404) ? this.noDataFound = true: this.noDataFound = false, 
          (this.responseObj.route && this.responseObj.route.length === 0 && this.responseObj.response_code === 405) ? this.loadingFail = true: this.loadingFail = false, 
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
