import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AirlinesService {
  baseUrl = 'https://beta.id90travel.com';

  constructor(private http: HttpClient) { }

  getAirlines() {
    const url_ = this.baseUrl + '/airlines';

    const options_: any = {
      observe: 'response',
      // responseType: "blob",
      params: new HttpParams(),
      headers: new HttpHeaders({})
    };

    return this.http.get(url_, options_);
  }
}
