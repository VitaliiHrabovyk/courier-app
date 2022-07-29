import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SwPush, SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  constructor(
    public userService: UserService,
    private swPush: SwPush,
    private router:Router,
  ) { }

  notificationAllow:boolean = false;
  locationAllow:boolean = false;
  readonly VAPID_PUBLIC_KEY = "BIfaMt6Al-C8JO_RnianWKQYU36viXtLooTyWvSF6f8qZJb339Dt3CXokd0xXarhyHuQqJp8BV2-SwQg5HuDJsk";
  checkingPermmisions = true;

  ngOnInit(): void {
    console.log("notification permission status is", Notification.permission);
    
    if(Notification.permission === "granted"){
      this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(res=>{
        if(res.sub) {
          console.log(res);
          console.log("sub true");
          this.swPush.requestSubscription(
            {serverPublicKey: this.VAPID_PUBLIC_KEY})
            .then(sub => {
              console.log(sub);
              console.log(sub.endpoint, typeof(sub.endpoint));
              console.log(res.sub.endpoint, typeof(res.sub.endpoint));

              if(sub.endpoint === res.sub.endpoint){
                
                this.notificationAllow = true;
                this.isPermissionsGranted()
              }
            })

        }else {
          console.log("Sub false");
        }
        this.checkingPermmisions = false;
       
      })
    } else {this.checkingPermmisions = false}

    navigator.permissions.query({name:'geolocation'}).then((permissionStatus)=> {
      if(permissionStatus.state === "granted"){
        console.log('geolocation permission status is ', permissionStatus.state);
        this.locationAllow = true;
      } else console.log("permission not granted");
      
    })


    
    
    

  }

  allowNotification() {
    this.swPush.unsubscribe;
    this.swPush.requestSubscription({
    serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      console.log(sub);
      this.userService.addSubscription(sub, localStorage.getItem("email"))
      this.notificationAllow = true;
      this.isPermissionsGranted()
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
}


allowLocation() {
  navigator.geolocation.getCurrentPosition(position => {
    console.log(position);
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords);
      let position_ = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        timeStamp: position.timestamp,
      }
      this.userService.addPosition(position_, localStorage.getItem("email"))      
    })

    this.locationAllow = true;
    this.isPermissionsGranted()
  }, 
    () => { console.log("User not allow") },
    { timeout: 10000 });
    
}

isPermissionsGranted(){
  if (this.notificationAllow == true && this.locationAllow == true){
    console.log("Permissions Granted");
    this.router.navigate(["main"])
  } else console.log("Permissions NOT Granted");
  
}


}
