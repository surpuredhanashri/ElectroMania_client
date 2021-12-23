import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  baseURL = 'http://localhost:8000';
  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}
  //   createUser(user:any){
  //     return this.http.post("http://localhost:3000/users", user);
  //  }
  //  getAllUser(){
  //    return this.http.get("http://localhost:3000/users")
  //  }
  insertEmployee(userObj: any): Observable<any> {
    var URL = this.baseURL + '/user/register';
    let header = { 'content-type': 'application/json' };
    return this.http.post(URL, userObj, {
      headers: header,
      responseType: 'text',
    });
  }
  getAll(): Observable<any> {
    var url = this.baseURL + '/user/getAll';
    return this.http.get(url);
  }
  findLogin(): Observable<any> {
    var url = this.baseURL + '/user/getAll';
    return this.http.get(url);
  }

  login(useremail: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseURL + '/user/login', {
      useremail,
      password,
    });
  }

  logOut() {
    this.localstorageService.removeToken();
    this.router.navigate(['/login']);
  }
}
