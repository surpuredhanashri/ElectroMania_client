import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  respone: any;
  baseURL = 'http://localhost:8000';

  constructor(private http: HttpClient, private cookieService: CookieService) {}
  name: any;
  addtoCart(item: any): Observable<any> {
    this.cartItemList.push(item);
    this.productList.next(this.cartItemList);
    let userObj = {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      img: item.img,
      name: this.name,
    };

    var URL = this.baseURL + '/cart';
    let header = { 'content-type': 'application/json' };
    return this.http.post(URL, userObj);
    console.log('User:' + userObj);
  }
  getAll(): Observable<any> {
    var url = this.baseURL + '/cart/Allcart';
    return this.http.get(url);
  }

  getallcart(): Observable<any> {
    console.log('Called Get All Cart');
    this.name = this.cookieService.get('uname');
    var url = this.baseURL + '/cart/AllUsercart/' + this.name;
    return this.http.get(url, this.name);
    console.log('Backend', this.http.get(url, this.name));
  }

  increase(item: any): Observable<any> {
    let cartObj = {
      id: item.id,
      title: item.itle,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      img: item.img,
      name: this.name,
    };
    console.log(cartObj);
    var url = this.baseURL + '/cart/updateAllcart';
    return this.http.put(url, cartObj);
  }

  decrease(item: any): Observable<any> {
    let cartObj = {
      id: item.id,
      title: item.itle,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      img: item.img,
      name: this.name,
    };
    console.log(cartObj);
    var url = this.baseURL + '/cart/updatedelAllcart';
    return this.http.put(url, cartObj);
  }

  getProducts() {
    return this.productList.asObservable();
  }

  removeCartItem(product: any): Observable<any> {
    console.log(product);
    var id = product.id;
    var url = this.baseURL + '/cart/deleteData/' + id;
    console.log('Removing' + id);
    return this.http.delete(url, id);
    // console.log(this.http.delete(url,id))
    // this.cartItemList.map((a:any, index:any)=>{
    //   if(product.id=== a.id){
    //     console.log(this.cartItemList)
    //     this.cartItemList.splice(index,1);
    //   }
    //   console.log(this.cartItemList)
    // })
    // this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    var url = this.baseURL + '/cart/deleteDataByCartId/';
    console.log('hi');
    return this.http.delete(url, { responseType: 'text' });
  }
  iquantity(ele: any) {}
}
