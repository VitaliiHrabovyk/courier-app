import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  login (user:any){
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.SetToken)
    )
}

private SetToken(response:any){
  console.log(response);
  if(response){
    localStorage.setItem('fb-token', response.idToken);
    localStorage.setItem('email', response.email);
  
  }else {localStorage.clear()}
  
}

isAuthenicated(){
  let token = localStorage.getItem('fb-token')
  return !!token;
  
}

logOut(){
  localStorage.clear();
  this.router.navigate(["/"])
}


}
