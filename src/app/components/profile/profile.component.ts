import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'src/app/service/message.service';
import { userService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  showImageUrl!: any;
  userDetail: any;
  stateList: any
  cityList: any
  selectedFile: any;

  constructor(
    private router: Router,
    private userService: userService,
    private _spinner: NgxSpinnerService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getUserInfo('')
    this.getStateList();
  }

  getUserInfo(type: string) {
    this._spinner.show();
    this.userService.getUserDetail().subscribe((res: any) => {
      this.userDetail = res.data
      this.showImageUrl = res.data?.avatar
      if (res?.data?.city) this.getCityList(res?.data?.state, 'api')
      this._spinner.hide();

      if (type) {
        let userData = JSON.parse(localStorage.getItem('userData')!);
        userData.user = res.data
        localStorage.setItem('userData', JSON.stringify(userData));
        this.userService.isUserProfileChange.next(true)
      }
    })
  }

  getStateList() {
    this._spinner.show();
    this.userService.getStateList().subscribe((res: any) => {
      this.stateList = res.data
      this._spinner.hide();
    })
  }

  getCityList(event: any, apiCallType: String) {
    
    this._spinner.show();
    let stateId
    if(apiCallType == 'ui'){
      stateId =  event.target.value
      this.userDetail.city = null
    } 
    else stateId =  event
    this.userService.getCityListById(stateId).subscribe((res: any) => {
      this.cityList = res.data
      this._spinner.hide();
    })
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  onSelectFiles(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.showImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  updateProfileData() {
    if (!this.userDetail.fullName ||!this.userDetail.email ||!this.userDetail.dateOfBirth ||!this.userDetail.state ||!this.userDetail.city ) {
      this.messageService.errorToast("Please fill all the required fields")
      return
    }
    this._spinner.show();
    let formData: any = new FormData();
    formData.append('fullName', this.userDetail.fullName)
    formData.append('email', this.userDetail.email)
    formData.append('dateOfBirth', this.userDetail.dateOfBirth)
    formData.append('state', this.userDetail.state)
    formData.append('city', this.userDetail.city)
    formData.append('avatar', this.selectedFile ?? this.userDetail?.avatar)

    this.userService.updateUserData(formData).subscribe((res: any) => {
      this.messageService.successToast("user data updated successfully")
      this.getUserInfo('api')
    })
  }

}
