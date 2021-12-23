import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthGuardService } from '../../services//authguard.service';
import { CookieService } from 'ngx-cookie-service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AlertifyService } from 'src/app/services/alertify.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authGuardService: AuthGuardService,
    private cookieService: CookieService,
    private alterify: AlertifyService,
    private registerService: RegisterService,
    private localstorageService: LocalstorageService
  ) {}

  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  authError: boolean = false;
  AuthMessage = 'Something went wrong';

  ngOnInit(): void {
    this._initloginForm();
  }

  private _initloginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Check if user is login

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.registerService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (data) => {
          this.authError = false;
          this.localstorageService.setToken(data.token);
          this.cookieService.set("uname", data.useremail);

          // console.log(data);
          this.router.navigate(['/home']);
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.authError = true;
            this.AuthMessage = 'Password is Wrong';
          }
          if (err.status === 404) {
            this.authError = true;
            this.AuthMessage = 'Email is Wrong';
          }
          if (err.status === 500) {
            this.authError = true;
            this.AuthMessage = 'Something went wrong';
          }
        }
      );
  }
}
