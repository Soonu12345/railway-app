import { Component, OnInit } from '@angular/core';
import { TrainRouteService } from './train-route.service';

@Component({
  selector: 'app-train-route',
  templateUrl: './train-route.component.html',
  styleUrls: ['./train-route.component.css']
})
export class TrainRouteComponent implements OnInit {

  numDays:any = [];
  routeData: any;
  errorObj: any;
  isTrainNumEmpty: boolean;

  trainRouteMap(number){
    if(number){
      this.TrainRouteService.getTrainMap(number).subscribe(
        responseObj => (
          this.routeData = responseObj,
          this.routeData.route.length>0 ?
          this.routeData.route.forEach(element => {
            this.numDays.push(element.day);
          }) : this.routeData.route = [],
          this.numDays =  Math.max.apply(null, this.numDays)
        ),
        errorObj => (
          this.errorObj = errorObj
        )
      )

    } else {
      this.isTrainNumEmpty = true;
    }
  }


  constructor(private TrainRouteService: TrainRouteService) { }

  ngOnInit() {
  }

}
