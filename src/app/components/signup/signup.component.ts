import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RegisterService } from '../../services/register.service';
import { FormControl } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  loading: any;
  buttionText: any;
  submitted: any;
  constructor(
    private formBuilder: FormBuilder,
    private https: HttpService,
    private http: HttpClient,
    private router: Router,
    private registerService: RegisterService
  ) {}
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phno: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.minLength(10),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  email: any;
  name: any;
  phno: any;
  password: any;
  arrEmployee: any = [];
  signupForm = new FormGroup({
    email: new FormControl(),
  });
  getAll() {
    this.registerService.getAll().subscribe(
      (data) => {
        console.log('Recieved data:' + JSON.stringify(data));
        this.arrEmployee = data;
      },
      (error) => console.log(error)
    );
  }
  id: any;
  signUp() {
    let userObj = {
      useremail: this.email,
      username: this.name,
      userphoneno: this.phno,
      password: this.password,
    };
    this.registerService.insertEmployee(userObj).subscribe(
      (data) => {
        alert('User Succes');
        console.log('Inserted data:' + JSON.stringify(data));
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      (error) => console.log(error)
    );
  }
  register() {
    this.loading = true;
    this.buttionText = 'Submiting...';
    let user = {
      name: this.name,
      email: this.email,
    };
    this.https.sendEmail('http://localhost:8000/user/sendmail', user).subscribe(
      (data: any) => {
        let res: any = data;
        console.log(
          `${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
        this.router.navigate(['login']);
      },
      (err: any) => {
        console.log(err);
        this.loading = false;
        this.buttionText = 'Submit';
      },
      () => {
        this.loading = false;
        this.buttionText = 'Submit';
      }
    );
  }
  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      alert(
        'Form Submitted succesfully!!!\n Check the values in browser console.'
      );
      console.table(this.signupForm.value);
    }
  }
}
