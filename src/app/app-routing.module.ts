
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from '../app/components/about/about.component';
import { HomeComponent } from '../app/components/home/home.component';
import { ContactComponent } from '../app/components//contact/contact.component';
import { UserDisplayComponent } from '../app/components//user-display/user-display.component';
import { NoPageFoundComponentComponent } from '../app/components//no-page-found-component/no-page-found-component.component';
import { ElectronicsComponent } from '../app/components//electronics/electronics.component';
import { LoginComponent } from '../app/components//login/login.component';
import { SignupComponent } from '../app/components/signup/signup.component';
import { CartComponent } from '../app/components//cart/cart.component';
import { FilterPipe } from './filter.pipe';
import { AuthGuardService } from './services/authguard.service';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordService } from './services/resetpassword.service';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

const routes: Routes = [
  {path:'',redirectTo:"/login",pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'userdisplay',component:UserDisplayComponent},
  {path:'userdisplayid/:id',component:UserDisplayComponent},
  {path:'userdisplayname/:fname',component:UserDisplayComponent},
  {path:'electronics',component:ElectronicsComponent},
  {path:'contact',component:ContactComponent},
  {path:'login',component:LoginComponent},
  {path:'cart',component:CartComponent, canActivate:[AuthGuardService]},
  {path:'signup',component:SignupComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'resetpassword',component:ResetpasswordComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
