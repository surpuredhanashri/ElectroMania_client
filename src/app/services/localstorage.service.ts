import { Injectable } from '@angular/core';

const TOKEN_KEY = 'jwtToken';
// const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  setToken(data: any) {
    localStorage.setItem(TOKEN_KEY, data);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
  // public getUser(): any {
  //   const user = window.sessionStorage.getItem(USER_KEY);
  //   if (user) {
  //     return JSON.parse(user);
  //   }
  // }
}
