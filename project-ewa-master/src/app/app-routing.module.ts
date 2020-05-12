import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProfilepageComponent} from './components/profilepage/profilepage.component';
import {MainpageComponent} from './components/mainpage/mainpage.component';
import {SettingspageComponent } from './components/admin/settingspage/settingspage.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {UsersComponent} from "./components/admin/users/users.component";

const routes: Routes = [
  {path: '', component: MainpageComponent},
  {path: 'profile', component: ProfilepageComponent
    //, canActivate: [SessionService]
  },
  {path: 'admin/settings', component: SettingspageComponent
    //, canActivate: [SessionService]
  },
  {path: 'navbar', component: NavbarComponent},
  {path: 'settings', component: SettingspageComponent},
  {path: 'users', component: UsersComponent},

];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
