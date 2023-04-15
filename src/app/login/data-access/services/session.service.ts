import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from 'src/app/shared/interfaces/login-credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  baseUrl = 'https://beta.id90travel.com';

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials) {
    const url_ = this.baseUrl + '/session.json';

    const options_: any = {
      observe: 'response',
      // responseType: "blob",
      params: new HttpParams(),
      headers: new HttpHeaders({})
    };

    return this.http.post(url_, credentials, options_);
  }
}
