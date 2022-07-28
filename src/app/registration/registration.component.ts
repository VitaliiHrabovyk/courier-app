import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private regService: RegistrationService,
    private authService: AuthService,
    private router:Router
  ) { }

  form!:FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      repassword: new FormControl(null, Validators.required),
    })
  }

  registration(){
    if (this.form.invalid){
      return
    }
    console.log("registration");
    
    let authUser = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.regService.registration(authUser).subscribe(response =>{
      console.log(response);
      
      let user = {
        name: this.form.value.name,
        email: this.form.value.email,
        phone: this.form.value.phone,
        countOftasks: 0,
        status: "free",
        
      }
      this.regService.creteUser(user)
      .subscribe(res => {
        console.log(res);
        this.authService.login(authUser).subscribe(res =>{ 
          console.log("Login Sucsess");
          this.router.navigate(["/main"])
        })

      })
 
    })
    
    
  }


}
