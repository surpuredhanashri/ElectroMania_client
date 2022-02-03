import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public closeResult: any = '';
  public quantity: any = [];
  public products: any = [];
  public grandTotal: any = 0;
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private modalService: NgbModal,
    private cookieService: CookieService,
    private router: Router
  ) {}
  public total: any = [];
  public filtercart: any = [];
  public name: any;
  public userObj: any;
  public cart: any;
  public ele: any;
  submitted: any;
  handler: any = null;
  ngOnInit(): void {
    this.loadStripe();
    this.checkoutForm = this.formBuilder.group({
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      area: ['', Validators.required],
      pincode: ['', [Validators.required]],
      phno: ['', [Validators.required]],
    });
    this.getCart();
  }
  state: any;
  city: any;
  area: any;
  pincode: any;
  phno: any;
  checkoutForm = new FormGroup({
    phno: new FormControl(),
  });

  orderhistroy(){
    
  }
  //payment with stripe
  pay(amount: any) {
    amount = this.grandTotal;
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51K4of9SIAsi5pFq0WIZ0nspLuRh1DhVqnKpua0SXtAtBH93c5R5Hkc657ojafZqByAa0UbSLcqpYr3iDf4XuOPfY004ZUxa8RO',
      locale: 'auto',
      token: function (token: any) {
        console.log('Token' + token);
        alert('Payment Successfully Done');
      },
    });
    handler.open({
      name: 'ElectroManis',
      description: 'Enter Transaction Details',
      image: 'https://c.tenor.com/h4vt2OwDR14AAAAC/excitement-guy.gif',
      amount: amount * 100,
    });
  }
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51K4p18SFH6bDbcCiqdmnyIGT8hNPjAJfx02fdqYiqTLGB3dRKqAP557UZm5YCbLk7P69VkrrwB02iDdxry17OWR600mocOE7iI',
          locale: 'auto',
          token: function (token: any) {
            console.log(token);
            alert('Payment Success!!');
          },
        });
      };
      window.document.body.appendChild(s);
    }
  }
  //Get All Cart items
  getCart() {
    this.cartService.getallcart().subscribe((res) => {
      this.products = res;
      this.name = this.cookieService.get('uname');
      console.log('Product Card', this.products);
      console.log(this.products);
      this.getTotal();
    });
  }
  //Get Grant Total
  getTotal() {
    //  for(var i=0;i<this.products.length;i++){
    //   this.grandTotal+=(this.products[i].quantity*this.products[i].quantity)
    //   console.log(this.grandTotal)
    //  }
    this.grandTotal = 0;
    this.products.forEach((ele: any) => {
      // console.log("Inside Total"+ele)
      this.grandTotal = this.grandTotal + ele.price * ele.quantity;
      //console.log(ele.price, ele.quantity)
      console.log('Grand Total is---->' + this.grandTotal);
    });
  }

  //Cart Item Quantity Increase
  qincrease(item: any) {
    let userObj = {
      id: item.id,
      title: item.itle,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      img: item.img,
      name: this.name,
    };
    this.cartService.increase(userObj).subscribe(
      (data) => {
        this.products.forEach((ele: any) => {
          //console.log("Before requ"+data[0].id)
          if (ele.id == data[0].id) {
            ele.quantity = data[0].quantity;
          }
          this.getTotal();
        });
        // console.log("All Updated data:"+JSON.stringify(data))
        //console.log("Updated data:"+data[0].id)
        //console.log(this.products)
      },
      (error) => console.log(error)
    );
    console.log(userObj);
  }
  //Cart Item Quantity Decrease
  qdecrease(item: any) {
    let userObj = {
      id: item.id,
      title: item.itle,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      img: item.img,
      name: this.name,
    };
    this.cartService.decrease(userObj).subscribe(
      (data) => {
        this.products.forEach((ele: any) => {
          //console.log("Before requ"+data[0].id)
          if (ele.id == data[0].id) {
            ele.quantity = data[0].quantity;
          }
          this.getTotal();
        });
        // console.log("All Updated data:"+JSON.stringify(data))
        //console.log("Updated data:"+data[0].id)
        //console.log(this.products)
      },
      (error) => console.log(error)
    );
    console.log(userObj);
  }
  //Remove Cart Item
  removeItem(item: any) {
    console.log('Clicked Delete');
    this.cartService.removeCartItem(item).subscribe((data) => {
      console.log('Data in remove Cart' + data);
    });
    this.cartService.getallcart().subscribe((res) => {
      this.products = res;
      this.getCart();
    });
  }

  //Empty Cart
  emptycart() {
    console.log('Hi test empty');
    this.cartService.removeAllCart().subscribe((data) => {
      console.log('Data in remove Cart' + data);
      this.getCart();
      this.router.navigate(['/electronics']);
    });
    this.cartService.getallcart().subscribe((res) => {
      this.products = res;
      this.getCart();
    });
  }
  //checkout modal
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
