
export class User{
    id:number=0;
    fname:string="";
    lname:string="";
    email:string="";
    phno:number=0;
    location:string="";
    password:number=0;
constructor(id:number,fname:string="",lname:string="",email:string="",phno:number=0,location:string="",password:number){
    this.id=id,
    this.fname=fname,
    this.lname=lname,
    this.email=email,
    this.phno=phno,
    this.location=location;
    this.password=password;
}
}   