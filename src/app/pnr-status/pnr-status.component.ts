import { Component, OnInit } from '@angular/core';
import {PnrStatusService} from './pnr-status.service'

@Component({
  selector: 'app-pnr-status',
  templateUrl: './pnr-status.component.html',
  styleUrls: ['./pnr-status.component.css']
})
export class PnrStatusComponent implements OnInit {

  noDataFound: boolean;
  loadingFail: boolean;
  trainNumWrong: boolean;
  apiKeyFail: boolean;

  constructor(private PnrStatusService:PnrStatusService) { }
  pnrNumber:Number;
  responseObj:any;
  
  getPNRStatus(){
    this.apiKeyFail = false;
    this.trainNumWrong = false;
    this.noDataFound = false;
    this.loadingFail = false;
    if(this.pnrNumber){
      this.PnrStatusService.getPNRStatusAPI(this.pnrNumber).
      subscribe(
        responseObj => (this.responseObj = responseObj,
          (this.responseObj.response_code === 500) ? this.apiKeyFail = true: this.apiKeyFail = false, 
          (this.responseObj.response_code === 502) ? this.trainNumWrong = true: this.trainNumWrong = false,
          (this.responseObj.response_code === 404) ? this.noDataFound = true: this.noDataFound = false, 
          (this.responseObj.response_code === 405) ? this.loadingFail = true: this.loadingFail = false
        ),
        errormsg => (console.log(errormsg.error.error, 'error'))
      )
    }
  }


  //on refresh handler function
  onRefreshHandler(){
    this.getPNRStatus();
  }
  ngOnInit() {
  }

}
