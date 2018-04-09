import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as globals from '../globals';
 
@Injectable()
export class TrainRouteService {

  constructor(private http:HttpClient) { }

  reqUrl:string;

  getTrainMap(reqObj):Observable<Object>{
    this.reqUrl = globals.base_url+ '/v2/route/train/' + reqObj + '/apikey/' +globals.apiKey+'/';
    return this.http.get(this.reqUrl, reqObj)
  }

}
