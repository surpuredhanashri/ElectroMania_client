import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http
      .get<any>('http://localhost:8000/products/getAllproducts')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  forgetPassword(useremail: any) {
    console.log('In service' + useremail);
    alert(useremail);
    return this.http.get('http://localhost:8000/getUserByEmail/' + useremail);
  }
}
