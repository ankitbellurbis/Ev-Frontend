import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _stationDetail: any;

  public get stationDetail(): any {
    return this._stationDetail;
  }
  
  public set stationDetail(value: any) {
    this._stationDetail = value;
  }

}
