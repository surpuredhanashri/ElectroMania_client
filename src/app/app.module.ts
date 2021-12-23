import { NgModule } from '@angular/core';
// import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
// import { NgImageSliderModule } from 'ng-image-slider';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { SharedModule } from './components/shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { FooterComponent } from './components/footer/footer.component';
import { JwtInterceptor } from './services/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    UserDisplayComponent,
    NoPageFoundComponentComponent,
    ElectronicsComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    FilterPipe,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbModule,
    // NgImageSliderModule,
    // NgxSpinnerModule,
    CommonModule,
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
