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
  
  getPNRStatus(){
    if(this.pnrNumber){
      this.PnrStatusService.getPNRStatusAPI(this.pnrNumber).
      subscribe(
        responseObj => (this.responseObj = responseObj,
          console.log(this.responseObj, 'success')),
  
        errormsg => (
          console.log(errormsg.error.error, 'error')
        )
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
