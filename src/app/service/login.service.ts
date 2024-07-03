import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { URLS } from '../app-url.constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isUserLoginCheck: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  userLogin(data: any) {
    return this.http.post(`${URLS.baseApiHostUrl}/${URLS.user.endpoint}/${URLS.user.methods.login}`, data)
  }

  registerUser(data: any) {
    return this.http.post(`${URLS.baseApiHostUrl}/${URLS.user.endpoint}/${URLS.user.methods.register}`, data)
  }

  userLogOut() {
    return this.http.post(`${URLS.baseApiHostUrl}/${URLS.user.endpoint}/${URLS.user.methods.logout}`, '')
  }
}
