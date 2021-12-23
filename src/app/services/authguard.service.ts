import { Injectable } from '@angular/core';
import { CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { RouterModule, Routes } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
@Injectable({
  providedIn: 'root'
})


export class AuthGuardService  implements CanActivate{

  constructor(private router:Router, private localstorageService:LocalstorageService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    const token = this.localstorageService.getToken();
    console.log(token);
    if (token) {
      const DecodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log(DecodedToken.exp);
      
      if (!this._tokenExpired(DecodedToken.exp)) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }


  private _tokenExpired(expiry: any): boolean {
    return Math.floor(Date.now() / 1000) >= expiry;

  }
}