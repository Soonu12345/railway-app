import { Component, OnInit } from '@angular/core';
import {PnrStatusService} from './pnr-status.service'

@Component({
  selector: 'app-pnr-status',
  templateUrl: './pnr-status.component.html',
  styleUrls: ['./pnr-status.component.css']
})
export class PnrStatusComponent implements OnInit {

  constructor(private PnrStatusService:PnrStatusService) { }
  pnrNumber:Number;
  responseObj:object;
  isPNRNumberEmpty:boolean;
  
  getPNRStatus(){
    if(this.pnrNumber){
      this.isPNRNumberEmpty = false;
      this.PnrStatusService.getPNRStatusAPI(this.pnrNumber).
      subscribe(
        responseObj => (this.responseObj = responseObj,
          console.log(this.responseObj, 'success')),
  
        errormsg => (
          console.log(errormsg.error.error, 'error')
        )
      )
    }
    else {
      this.isPNRNumberEmpty = true;
    }
  }


  //on refresh handler function
  onRefreshHandler(){
    this.getPNRStatus();
  }
  ngOnInit() {
  }

}
