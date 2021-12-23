import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from '../../services/resetpassword.service';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  isSubmitted: boolean = false;
  authError: boolean = false;
  AuthMessage = 'You Entered Wrong Email.';
  constructor(private resetPasswordService: ResetPasswordService,private router: Router) {}
  ngOnInit(): void {
    this._initPasswordForm();
  }
  private _initPasswordForm() {
    this.passwordForm = new FormGroup({
      useremail: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.passwordForm.valid) {
      this.resetPasswordService.sendOtp(this.passwordForm.value).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/resetpassword/']);
        },
        (err) => {
          this.authError = true;
        }
      );
    }
  }
}