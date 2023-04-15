import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetHotelsParams } from 'src/app/shared/interfaces/get-hotels-params.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  baseUrl = 'https://beta.id90travel.com';

  constructor(private http: HttpClient) { }

  getHotels(params: GetHotelsParams) {

    const url_ = this.baseUrl + '/api/v1/hotels.json';

    const options_: any = {
      observe: 'response',
      // responseType: "blob",
      params: new HttpParams(),
      headers: new HttpHeaders({})
    };

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        if (Array.isArray(value)) {
          for (const item of value) {
            options_.params = options_.params.append(`${key}[]`, item);
          }
        } else {
          options_.params = options_.params.append(key, value);
        }
      }
    }
    return this.http.get(url_, options_);
  }
}
