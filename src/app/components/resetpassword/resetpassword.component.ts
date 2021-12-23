import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from '../../services/resetpassword.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  verifyForm!: FormGroup;
  isSubmitted: boolean = false;
  authError: boolean = false;
  AuthMessage = 'Somethnig went wrong';
  constructor(private resetPasswordService: ResetPasswordService,private router: Router) {}
  ngOnInit(): void {
    this._initVerifyForm();
  }
  private _initVerifyForm() {
    this.verifyForm = new FormGroup({
      useremail: new FormControl('', Validators.required),
      otp: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  // ONSUBMIT
  onSubmit() {
    this.isSubmitted = true;
    if (this.verifyForm.invalid) {
      return;
    }
    this.resetPasswordService.resetPassword(this.verifyForm.value).subscribe(
      (res) => {
        console.log(res);
        this.authError = false;
        this.router.navigate(['/login']);
      },
      // (err) => {
      //   this.authError = true;

      // }
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.authError = true;
          this.AuthMessage = 'Please Enter valid Details.';
        } else {
          this.authError = true;
          this.AuthMessage = 'Something went wrong';
        }
      }
    );
  }
}