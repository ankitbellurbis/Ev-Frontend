import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StationService } from 'src/app/service/station.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-charging-list',
  templateUrl: './charging-list.component.html',
  styleUrls: ['./charging-list.component.scss']
})
export class ChargingListComponent {
  chargerList: any = [];
  chargerListClone: any = [];
  pageSize = 10;
  currentPage = 1;
  dataSearch!: any

  constructor(
    private router: Router,
    private _stationService: StationService,
    private _spinner: NgxSpinnerService,
    private _storageService: StorageService
  ) { }

  ngOnInit() {
    this.getChargerList()
  }

  filterProducts(): void {
    this.currentPage = 1;

    if (this.dataSearch.trim() !== '') {
      this.chargerListClone = this.chargerList?.filter((product: any) => {
        if (
          product?.stationName?.toLowerCase()?.includes(this.dataSearch.toLowerCase())
        )
          return product?.stationName
            ?.toLowerCase()
            ?.includes(this.dataSearch.toLowerCase());
        else if (
          product?.operatorName?.toLowerCase()?.includes(this.dataSearch.toLowerCase())
        )
          return product?.operatorName
            ?.toLowerCase()
            ?.includes(this.dataSearch.toLowerCase());
        else if (
          product?.address1
            ?.toLowerCase()
            ?.includes(this.dataSearch.toLowerCase())
        )
          return product?.address1
            ?.toLowerCase()
            ?.includes(this.dataSearch.toLowerCase());
        else if (
          product?.address2
            ?.toLowerCase()
            ?.includes(this.dataSearch.toLowerCase())
        )
          return product?.address2
            ?.toLowerCase()
            ?.includes(this.dataSearch.toLowerCase());
        else if (
          product?.state
            ?.toLowerCase()
            ?.includes(this.dataSearch.toLowerCase())
        )
          return product?.state
            ?.toLowerCase()
            ?.includes(this.dataSearch.toLowerCase());
        else
          return product?.contactNumber
            ?.toLowerCase()
            ?.includes(this.dataSearch.toLowerCase());
      });
    } else {
      // If the search term is empty, show all products
      this.chargerListClone = this.chargerList;
    }
  }

  navigateTo(path:string){
    this.router.navigate([path]);
  }

  getChargerList(){
    this._spinner.show();
    this._stationService.getStationList().subscribe((res:any)=>{
      this._spinner.hide();
      this.chargerList = res?.data;
      this.chargerListClone = this.chargerList;
    })
  }

  setStationDetail(item:any){
    this._storageService.stationDetail = item
    this.navigateTo('/chargerDetail')
  }
}
