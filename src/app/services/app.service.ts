import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private cookieService: CookieService) { }


  public getUserData() {
    console.log("Called App Service"+this.cookieService.get('uname'));
    return this.cookieService.get('uname');
  }
}
