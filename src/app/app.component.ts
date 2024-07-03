import { Component } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EV_stations';
  

  isUserLogin!: boolean;

  constructor(
    private loginService: LoginService
  ){}

  ngOnInit(){
    this.loginService.isUserLoginCheck.subscribe((res:any)=>{
      if(res) this.isUserLogin = true
      else this.isUserLogin = false
    })

    if(localStorage.getItem('isLogin') == 'true') this.loginService.isUserLoginCheck.next(true);
  }
}
