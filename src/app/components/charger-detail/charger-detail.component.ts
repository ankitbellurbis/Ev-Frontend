import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'src/app/service/message.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-charger-detail',
  templateUrl: './charger-detail.component.html',
  styleUrls: ['./charger-detail.component.scss']
})
export class ChargerDetailComponent {
  stationDetail: any;
  stationPic: string = 'https://icon-library.com/images/generic-user-icon/generic-user-icon-9.jpg'

  constructor(
    private router: Router,
    private _spinner: NgxSpinnerService,
    private _messageService: MessageService,
    private _storageService: StorageService
  ) { }

  ngOnInit(): void {
    if (!this._storageService.stationDetail) {
      this.router.navigate(['/chargerList'])
    }
    else {
      this.stationDetail = this._storageService.stationDetail
      if (this.stationDetail?.stationPicture) this.stationPic = this.stationDetail?.stationPicture
    }
  }

}
