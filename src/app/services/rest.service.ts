
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseURL="http://localhost:8001"
  constructor(private http:HttpClient) { }
  URL="http://localhost:3000/signupUser";
  getUsers():Observable<any>
  {
    return this.http.get <User[]>(this.URL);
  }
 
getProductById(id :number):Observable<any>
{
  return this.http.get <User[]>(this.URL);
}
searchName(s: string) {
  if (s) {
    return this.http
      .get(`http://localhost:3000/signupUser?fname_like=${s.trim()}`)
      .pipe(tap((_) => console.log(`Searching for: ${s}`)));
  } else {
    return this.http.get(`http://localhost:3000/signupUser`);
  }

}
searchId(s: number) {
  if (s) {
   ;
    return this.http
      .get(`http://localhost:3000/signupUser?id_like=${s}`)
      .pipe(tap((_) => console.log(`Searching for: ${s}`)));
  } else {
    return this.http.get(`http://localhost:3000/signupUser`);
  }
}
}