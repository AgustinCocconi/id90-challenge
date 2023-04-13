import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginCredentials } from 'src/app/shared/interfaces/login-credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  baseUrl = "https://beta.id90travel.com"

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials) {
    let url_ = this.baseUrl + "/session.json";

    let options_: any = {
      observe: "response",
      // responseType: "blob",
      params: new HttpParams(),
      headers: new HttpHeaders({})
    };

    return this.http.post(url_, credentials, options_);
  }
}
