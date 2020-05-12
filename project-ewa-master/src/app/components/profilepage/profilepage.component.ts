import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialog, MatIconRegistry} from "@angular/material";
import {ChangePasswordDialogComponent} from "./change-password-dialog/change-password-dialog.component";
import {ProfileSettingsDialogComponent} from "./profile-settings-dialog/profile-settings-dialog.component";
import {DomSanitizer} from "@angular/platform-browser";
import {SessionService} from "../../services/session.service";
import {User} from "../../model/user";
import {Gps} from "../../model/gps";

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.scss']
})
export class ProfilepageComponent {
  @ViewChild('profileForm', {static: false}) profileForm: NgForm;
  currentUser: User;
  private _gpsCoordinates: Gps;

  constructor(public dialog: MatDialog, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private sessionService: SessionService) {
    // iconRegistry.addSvgIcon(
    //   'back',
    //   sanitizer.bypassSecurityTrustResourceUrl('./assets/img/go-back-left-arrow.svg'));
    this.currentUser = sessionService.getCurrentUser();
    this.sessionService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    this._gpsCoordinates = sessionService.getInternalGps();
    this.sessionService.currentGps.subscribe(_currentGps => this._gpsCoordinates = _currentGps);
  }

  openPasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '600px'
    });
  }

  openSettingsDialog(): void {
    this.onOpenPage();
    const dialogRef = this.dialog.open(ProfileSettingsDialogComponent, {
      width: '600px'
    });
  }

  saveProfileChanges() {
    const nickname = this.profileForm.value.nickname;
    const email = this.profileForm.value.email;
    const user = this.currentUser;
    user.setNickname(nickname);
    user.setEmail(email);
    console.log(this.sessionService.getIndex(this.currentUser));
    this.sessionService.updateUser(user);
  }

  private onOpenPage(): any {
    this.sessionService.saveCurrentLocation(this._gpsCoordinates);
  }
}
