import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseURL = 'http://localhost:8000/order';

  constructor() { }
}
