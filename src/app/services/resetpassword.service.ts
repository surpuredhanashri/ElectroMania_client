import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Otp } from '../../otp';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ResetpasswordService {
  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private http: HttpClient) {}

  sendmail = 'http://localhost:8000/reset/sendmail';
  verify = 'http://localhost:8000/reset/verify';

  sendOtp(useremail: string): Observable<Otp> {
    return this.http.post<Otp>(this.sendmail, useremail);
  }

  resetPassword(otp: Otp): Observable<Otp> {
    return this.http.post<Otp>(this.verify, otp);
  }
}
