import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private router:Router 
  ) { }
  

  ngOnInit(): void {
    if(this.auth.isAuthenicated()){
      this.router.navigate(["main"])
    }
  }

}
