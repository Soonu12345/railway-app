import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class PnrStatusService {

  constructor(private http: HttpClient) { }
  reqUrl = '';
  apiKey='mws5ewb9o9'

  getPNRStatusAPI(reqObj): Observable<object> {
    this.reqUrl='https://api.railwayapi.com/v2/pnr-status/pnr/'+reqObj+'/'+'apikey/'+this.apiKey+'/'
   return this.http.get(this.reqUrl, reqObj)
  }


}
