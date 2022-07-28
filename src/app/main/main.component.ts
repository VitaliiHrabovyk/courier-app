import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { map, Observable } from 'rxjs'
import { User } from '../models/app.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

 

  constructor(
    public userService:UserService,
    public authService:AuthService,
    private http:HttpClient
  ) {}
  
  currentUser:any
   

  ngOnInit(): void {
    if(localStorage.getItem("email")){
      this.userService.getUserByEmail(localStorage.getItem("email")).subscribe(res => {this.currentUser = res;}
      )
    }
  }

  testNotification() {

    this.userService.getUserByEmail(localStorage.getItem("email")).subscribe(res => {
      console.log(res);
      let data = {
        title: "This is a test notification",
        body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto adipisci maiores laudantium consequuntur dolore tenetur explicabo optio deleniti vel voluptates?",
        subscribe: JSON.stringify(res.sub)
      }
      
      this.http.post("https://push-vitalii-hrabovyk.herokuapp.com/api/send", data).subscribe(res => console.log(res))

    })
      }
}

