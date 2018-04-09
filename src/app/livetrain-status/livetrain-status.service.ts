import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as globals from '../globals';

@Injectable()
export class LivetrainStatusService {

  constructor(private http: HttpClient) { }
  reqUrl:string;

  getLiveTrainStatus(trainNumber,Date): Observable<object> {
    this.reqUrl=globals.base_url+'/v2/live/train/'+trainNumber+'/date/'+Date+'/'+'apikey/'+globals.apiKey+'/'
   return this.http.get(this.reqUrl, trainNumber)
  }
}
