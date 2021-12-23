import { Component, SimpleChanges } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/authguard.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AppService  } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  
}

function logout() {
  throw new Error('Function not implemented.');
}
