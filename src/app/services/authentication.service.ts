import { Injectable } from '@angular/core';

import { RouterModule, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private router:Router) { }
  varIsLoggedIn="isLoggedIn";
  login(){
    localStorage.setItem(this.varIsLoggedIn,'true');
  }
  logout(){
    localStorage.setItem(this.varIsLoggedIn,'false');
  }
}