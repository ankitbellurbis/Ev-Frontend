import { userService } from 'src/app/service/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/service/login.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  isUserLogin: boolean = true;
  loginForm: FormGroup;
  signupForm: FormGroup;
  showPassword!: boolean;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService,
    private _spinner: NgxSpinnerService,
    private userService: userService,
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.signupForm = this._fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loginService.isUserLoginCheck.next(false);
    localStorage.removeItem('isLogin');
    localStorage.removeItem('userData');
  }

  login() {
    this._spinner.show()
    this.loginService.userLogin(this.loginForm.value).subscribe((res: any) => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('userData', JSON.stringify(res?.data));
      if(res?.data?.avatar) this.userService.isUserProfileChange.next(true)
      this.loginService.isUserLoginCheck.next(true);
      this._spinner.hide()
    })
  }

  registerUser(){
    this._spinner.show()
    this.loginService.registerUser(this.signupForm.value).subscribe((res:any)=>{
      this.messageService.successToast(res?.message)
      this.signupForm.reset()
      this._spinner.hide();
    })
  }

}
