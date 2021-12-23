import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { RouterModule,Router,Route } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(){}
  arrUsers:User[]=[];
  
getAllProducts(){
  return this.arrUsers;
}
getProductById(id :number){
  return this.arrUsers.filter((user_ele)=>user_ele.id==id)
}
getProductByName(fname:string){
  return this.arrUsers.filter((user_ele)=>user_ele.fname==fname)
}
}