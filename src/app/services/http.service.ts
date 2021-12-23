import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url = 'http://localhost:8000/user/sendmail';

  constructor(private http: HttpClient) {}
  sendEmail(url: any, data: any) {
    return this.http.post(url, data);
  }
}
