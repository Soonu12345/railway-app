import { Component, OnInit } from '@angular/core';
import { TrainBtwStationsService } from './train-btw-stations.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


@Component({
  selector: 'app-train-btw-stations',
  templateUrl: './train-btw-stations.component.html',
  styleUrls: ['./train-btw-stations.component.css']
})

export class TrainBtwStationsComponent implements OnInit {
  
  noTrainsFound: boolean;
  trainBtwStationsForminvalid: boolean;
 public isCollapsed = true;
  errormsg: string;
  trainsData: any;
  errorObj: any;
  toSourceData:any = [];
  sorceStation:any = [];
  public fromstation: any;
  public tostation: any;

  responseObj: any;
  public toSource: any;

  formatter = (result: string) => result.toUpperCase();

  fromStation = (text$: Observable<string>) =>
    text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(term => term === '' ? []
    : this.sorceStation.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  toStation = (text$: Observable<string>) =>
    text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(term => term === '' ? []
    : this.sorceStation.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));


  getStations (station:string) {
    this.sorceStation = [];
    this.toSourceData = [];
    if(station){
        this.TrainBtwStationsService.getStationsAPI(station).
        subscribe(
          responseObj => (this.responseObj = responseObj,

            this.responseObj.stations ? this.responseObj.stations.forEach(element => {
              this.sorceStation.push(element.code +' ' +element.name);
            }) : this.errormsg = 'no trains found in this route'
          ),
          errormsg => (
            console.log(errormsg.error.error, 'error')
          )
        )

    }
  }



  replaceStations(from, to){
    this.fromstation = to;
    this.tostation = from;
  }

  trainBtwStations(formValues){
    if(formValues.fromstation && formValues.tostation && formValues.dp){
      let doj = formValues.dp;
      doj = doj.day +'-'+doj.month +'-'+doj.year;
      let data:object = {fromstation: formValues.fromstation.split(' ')[0], tostation:formValues.tostation.split(' ')[0], doj:doj};
  
      this.TrainBtwStationsService.getTrainBtwstationsAPI(data)
      .subscribe(
        responseObj =>(
          this.trainsData = responseObj,
          this.trainsData.trains.length ===0 ?this.noTrainsFound =true : this.noTrainsFound =false
        ),
        errorObj=>(this.errorObj = errorObj)
      )
    } else {
      this.trainBtwStationsForminvalid = true;
    }
  
  }

  constructor(private TrainBtwStationsService:TrainBtwStationsService) { }

  ngOnInit() {
  }

}
