import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../app-url.constant';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) { }

  getStationList() {
    return this.http.get(`${URLS.baseApiHostUrl}/${URLS.station.methods.station}`);
  }

  searchAddressLatLong(state:any, city:any){
    let paramData:any = {
      country: 'india',
    }
    if(state) paramData['state'] = state
    if(city) paramData['city'] = city
    paramData['format'] = 'jsonv2';
    return this.http.get(`${URLS.baseAddressUrl}${URLS.addressUrl.endpoint}`, {
      params: paramData,
    });
  }
}
