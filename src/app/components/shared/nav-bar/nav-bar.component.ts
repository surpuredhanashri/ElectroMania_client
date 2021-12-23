import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthGuardService } from 'src/app/services/authguard.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLoggedIn = false;
  name?: string;

  constructor(private registerService:RegisterService, private localstorageService: LocalstorageService) { }



  ngOnInit(): void {


  }

  ngDoCheck() {
    this.isLoggedIn = !!this.localstorageService.getToken();
    if (this.isLoggedIn) {
      // this.localstorageService.getUser().subscribe(
      //   (user: Users) => {
      //     this.name = user.name;
      //   }
      // );
    }
        
  }


  logout() {
    this.registerService.logOut();
    window.location.reload();
  }

}
