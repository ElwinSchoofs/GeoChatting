import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {SessionService} from "../../services/session.service";
import {User} from "../../model/user";
import {Gps} from "../../model/gps";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showFiller = false;

  currentUser: User;
  forceOpenState: boolean;

  constructor(private sessionService: SessionService) {
    this.forceOpenState = false;
    this.currentUser = sessionService.getCurrentUser();
    this.sessionService.currentUser.subscribe(currentUser => this.currentUser = currentUser);

  }

  ngOnInit() {

  }

}
