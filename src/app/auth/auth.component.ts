import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  form!:FormGroup


submit() {
  let user = {
    email: this.form.value.email,
    password: this.form.value.password,
  }
  console.log(user);
  
  this.authService.login(user).subscribe(res => this.router.navigate(["/permissions"])
  )
  
  

}

  ngOnInit(): void {
    this.form = new FormGroup ({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }




}
