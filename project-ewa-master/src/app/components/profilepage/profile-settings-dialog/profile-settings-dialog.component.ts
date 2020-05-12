import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {DeleteProfileDialogComponent} from "../delete-profile-dialog/delete-profile-dialog.component";
import {SessionService} from "../../../services/session.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile-settings-dialog',
  templateUrl: './profile-settings-dialog.component.html',
  styleUrls: ['./profile-settings-dialog.component.scss']
})
export class ProfileSettingsDialogComponent implements OnInit {
  private readonly SNACKBAR_DURATION = 5000;
  constructor(public router: Router, public dialog: MatDialog, private sessionService: SessionService, public dialogRef: MatDialogRef<ProfileSettingsDialogComponent>, private _snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteProfileDialogComponent, {
      width: '600px'
    });
    this.dialogRef.close();
  }
  signOff(){
      this.sessionService.signOff();
      this.router.navigate(['']);
      this.dialogRef.close();
      this.openSnackBar("Sign out succesfully")
  }
  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: this.SNACKBAR_DURATION,
    });
  }
  getSessionService(){
    return this.sessionService;
  }
}
