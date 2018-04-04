import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as globals from '../globals';


@Injectable()
export class TrainBtwStationsService {

  constructor(private http: HttpClient) { }
  reqUrl:string;

  getStationsAPI(reqObj): Observable<object> {
    this.reqUrl=globals.base_url+'/v2/suggest-station/name/'+reqObj+'/apikey/'+globals.apiKey+'/';
    return this.http.get(this.reqUrl, reqObj)
  }

  getTrainBtwstationsAPI(reqObj): Observable<object> {
    this.reqUrl=globals.base_url+'/v2/between/source/'+reqObj.fromstation+'/dest/'+reqObj.tostation+'/date/'+reqObj.doj+'/apikey/'+globals.apiKey +'/';
    return this.http.get(this.reqUrl, reqObj)
  }

}
