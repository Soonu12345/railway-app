import { Component, OnInit } from '@angular/core';
import { TrainRouteService } from './train-route.service';

@Component({
  selector: 'app-train-route',
  templateUrl: './train-route.component.html',
  styleUrls: ['./train-route.component.css']
})
export class TrainRouteComponent implements OnInit {

  noDataFound: boolean;
  loadingFail: boolean;
  trainNumWrong: boolean;
  apiKeyFail: boolean;
  numDays:any = [];
  routeData: any;
  errorObj: any;
  
  trainRouteMap(number, form){
    if(form.valid){
    this.apiKeyFail = false;
    this.trainNumWrong = false;
    this.noDataFound = false;
    this.loadingFail = false;
      this.TrainRouteService.getTrainMap(number.trim()).subscribe(
        responseObj => (
          this.routeData = responseObj,
          (this.routeData.route && this.routeData.route.length === 0 && this.routeData.response_code === 500) ? this.apiKeyFail = true: this.apiKeyFail = false, 
          (this.routeData.route && this.routeData.route.length === 0 && this.routeData.response_code === 502) ? this.trainNumWrong = true: this.trainNumWrong = false,
          (this.routeData.route && this.routeData.route.length === 0 && this.routeData.response_code === 404) ? this.noDataFound = true: this.noDataFound = false, 
          (this.routeData.route && this.routeData.route.length === 0 && this.routeData.response_code === 405) ? this.loadingFail = true: this.loadingFail = false, 
          (this.routeData.route && this.routeData.route.length>0) ? 
            (this.routeData.route.forEach(element => {
                this.numDays.push(element.day);}),
              this.numDays = this.numDays.sort().reverse()[0])
          : this.routeData.route = []            
        ),
        errorObj => (
          this.errorObj = errorObj,
          console.log(errorObj)
        )
      )
    }
  }


  constructor(private TrainRouteService: TrainRouteService) { }

  ngOnInit() {
  }

}
