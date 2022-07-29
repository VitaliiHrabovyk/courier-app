import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs'
import { User } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
   private http:HttpClient,
  ) { }



  getUserByEmail(email:any){
    return this.http.get("https://courier-f2f1d-default-rtdb.europe-west1.firebasedatabase.app/users.json")
   .pipe(map(response => {
    for (const key in response) {
      if (Object.prototype.hasOwnProperty.call(response, key)) {
        const element = response[key];
        if(element.email === email){
          return element
        }
          
      }
    }
  }))
    
  }

  getUserId(email:any){
    return this.http.get("https://courier-f2f1d-default-rtdb.europe-west1.firebasedatabase.app/users.json")
    .pipe(map(response => {
     for (const key in response) {
       if (Object.prototype.hasOwnProperty.call(response, key)) {
         const element = response[key];
         if(element.email === email){
          return key || element // got problem  
         } 
       }
     }
   }))
    
  }

  addSubscription(sub:any, email:any){
    this.getUserId(email).subscribe(UserId => {
      console.log(UserId);
      
      this.http.patch(`https://courier-f2f1d-default-rtdb.europe-west1.firebasedatabase.app/users/${UserId}/sub.json`, sub).subscribe(res=>{
        console.log("sub push succses");
        
      })
    })
  } 

  addPosition(position:any, email:any){
    this.getUserId(email).subscribe(userId => {
      console.log(userId);
      this.http.patch(`https://courier-f2f1d-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/pos.json`, position).subscribe(res=>{
        console.log(res);
      })
    })
  } 



}
