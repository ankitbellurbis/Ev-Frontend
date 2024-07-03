import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../app-url.constant';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class userService {
    public isUserProfileChange: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private http: HttpClient) { }

    getUserDetail() {
        return this.http.get(`${URLS.baseApiHostUrl}/${URLS.user.endpoint}`)
    }

    getStateList() {
        return this.http.get(`${URLS.baseApiHostUrl}/${URLS.state.endpoint}`)
    }

    getCityListById(id: any) {
        return this.http.get(`${URLS.baseApiHostUrl}/${URLS.city.endpoint}/${id}`)
    }

    updateUserData(requestBody: any) {
        return this.http.put(`${URLS.baseApiHostUrl}/${URLS.user.endpoint}/${URLS.user.methods.update}`, requestBody)
    }
}
