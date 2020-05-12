import { Injectable } from '@angular/core';
import {SessionService} from "./session.service";
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate{

  constructor(private sessionService: SessionService, public router: Router) { }

  canActivate(): boolean {
    if (this.sessionService.getCurrentUser().getIsAdmin()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
