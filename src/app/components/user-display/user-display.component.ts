import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user'
import { HttpClient } from '@angular/common/http';
import { RestService } from '../../services/rest.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  constructor(private restService:RestService,private userService:UserService,private activatedRoute:ActivatedRoute,private router:Router) { }


  columns=["First Name","Last Name","Email","Phone Number","Location"];

 public idFor?:any;
 public nameFor?:any;
  
ngOnInit()
{
 
  this.activatedRoute.paramMap.subscribe((param)=>
  {
    
    if(param.get('fname') !== null){
      this.nameFor = String(param.get('fname'))
    } 
   
    
    if(this.nameFor!="")
    {
     
    this.displayBasedOnName();

    }
    else
    this.getAllProducts();
  });
 
}
readData()
{
  
this.restService.getUsers().subscribe(
  (data:any) =>
  {
    this.arrUsers=data;
    
  },
)
}

pname(){

  this.readData();
  this.restService.searchName(this.nameFor).subscribe(
    
    (data:any)=>
    {
this.arrUsers=data;
    }
  )


}
arrUsers:User[]=[];
  getAllProducts(){
   
    this.arrUsers=this.userService.getAllProducts();
    this.readData();
  }
  
  displayBasedOnName(){

    this.arrUsers=this.userService.getProductByName(this.nameFor);
    this.pname();
   
}

 
  routeBasedOnString(){

   
    let strURLForUserFilterByName="";
   if(this.nameFor!="")
   strURLForUserFilterByName="userdisplayname/"+this.nameFor;
  this.router.navigate([strURLForUserFilterByName]);
  this.pname();
   
  
  }
  displayAll()
  {
    
    this.arrUsers=this.userService.getAllProducts();
    this.readData();
  }
}