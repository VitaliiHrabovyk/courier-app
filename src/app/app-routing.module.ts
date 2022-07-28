import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RegistrationComponent } from './registration/registration.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {path: "",  component: StartComponent},
  {path: "auth",  component: AuthComponent},
  {path: "reg",  component: RegistrationComponent},
  {path: "main",  component: MainComponent},
  {path: "permissions",  component: PermissionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
