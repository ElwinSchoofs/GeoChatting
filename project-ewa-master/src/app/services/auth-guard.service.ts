import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private sessionService: SessionService, public router: Router) { }

  canActivate(): boolean {
    if (this.sessionService.getCurrentUser()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
