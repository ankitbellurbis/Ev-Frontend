import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/service/login.service';
import { userService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  userName!:string
  userImage:string = "https://icon-library.com/images/generic-user-icon/generic-user-icon-9.jpg"

  constructor(
    private router: Router,
    private userService: userService,
    private loginService: LoginService,
    private _spinner: NgxSpinnerService
  ){}

  ngOnInit(){
    this.showUserInfo()
    this.userService.isUserProfileChange.subscribe((res)=>{
      if(res) this.showUserInfo()
    })    
  }

  showUserInfo(){
    let userData:any = JSON.parse(localStorage.getItem('userData')!)
    this.userName = userData?.user?.fullName
    if(userData?.user?.avatar) this.userImage = userData?.user?.avatar
  }

  logoutUser(){
    this._spinner.show()
    this.loginService.userLogOut().subscribe((res:any)=>{
      if(res.success) this.navigateTo('login')
      this._spinner.hide()
    })
  }

  navigateTo(path:string){
    this.router.navigate([path]);
  }

}
