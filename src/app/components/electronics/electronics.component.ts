import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user';
import { FilterPipe } from '../../filter.pipe';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuardService } from 'src/app/services/authguard.service';

import { Router } from '@angular/router';
import { not } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.css']
})

export class ElectronicsComponent implements OnInit {
  public x: any = [];
  public exists: boolean = false;
  public productList: any;
  public filterCategory: any
  searchKey: string = "";
  public name: any;
  varlogin: any;
  totalItem: any;

  constructor(private api: ApiService, private cartService: CartService, private cookieService: CookieService, private authguardService: AuthGuardService, private router: Router) { }

  ngOnInit(): void {
    this.api.getProduct().subscribe(res => {
        this.productList = res;
        this.filterCategory = res;
        this.productList.forEach((a: any) => {
          if (a.productcateogry === "women's clothing" || a.productcateogry === "men's clothing") {
            a.productcateogry = "fashion"
          }
        });
        // console.log(this.productList)
      });
    this.cartService.getallcart().subscribe(res => {
        this.totalItem = res.length;
      })
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }
  //ADD TO CART POSSIBLE ONLY IF USER LOGIN IN
  user(item: any) {
    this.name = this.cookieService.get('uname');
    // console.log(this.name)
    if (this.name) {

      this.add(item);
    }
    else {
      alert("Sorry you are not allowed to view this page. Please LOGIN !!");
    }
  }
  //SEARCH FOR PRODUCTS
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
  //ADD THAT TO CART IF NOT EXISTING
  add(item: any) {
    // this.x.push(item.productid);
    // console.log("X:",this.x)
    this.cartService.getallcart().subscribe((data) => {
      this.x = data;
      this.execute(item);
    })
  }
  //IF ITEM ALREADY IN CART
  async execute(item: any) {
    this.x.forEach((element: any) => {
      if (element.id == item.productid) {
        this.exists = true;
      }
    });

    this.exists ? alert("Item already in Cart") : this.addtocart(item);
    this.exists = false;
  }
  //ADD TO CART TABLE
  addtocart(item: any) {
    this.name = this.cookieService.get('uname');
    console.log("Name" + this.name);
    let cartObj = { "id": item.productid, "title": item.productitle, "description": item.productdescription, "price": item.productprice, "quantity": item.productquantity, "img": item.productimg, "name": this.name }
    this.cartService.addtoCart(cartObj).subscribe((data) => {
      alert("Cart Updated");
      console.log("Inserted data:" + JSON.stringify(data))

    },
      (error) => console.log(error)
    )
  }
  //CATEGORY FILTER
  filter(category: string) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        if (a.productcateogry == category || category == '') {
          return a;
        }
      })
  }
  //BRAND FILTER
  afilter(brand: string) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        if (a.productbrand == brand || brand == '') {
          return a;
        }
      })
  }
  //RATING FILTER
  rfilter(rating: string) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        if (a.productrating == rating || rating == '') {
          return a;
        }
      })
  }
  public searchTerm !: string;



  PriceLowtoHigh() {
    this.productList.sort((x:any, y:any) => x.productprice - y.productprice);
  }

  PriceHighToLow() {
    this.productList.sort((x:any, y:any) => y.productprice - x.productprice);
  }

}
// function cartObj(cartObj: any) {
//   throw new Error('Function not implemented.');
// }

