import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {SessionService} from '../../../services/session.service';
import {User} from "../../../model/user";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete-profile-dialog',
  templateUrl: './delete-profile-dialog.component.html',
  styleUrls: ['./delete-profile-dialog.component.scss']
})
export class DeleteProfileDialogComponent implements OnInit {
  private passWord: string;
  private passwordCheck: string;
  currentUser: User;
  private deleteCheckBox: boolean;
  private readonly SNACKBAR_DURATION = 5000;
  hide = true;

  constructor(public router: Router, public dialogRef: MatDialogRef<DeleteProfileDialogComponent>, private sessionService: SessionService, private _snackBar: MatSnackBar) {
  this.currentUser = sessionService.getCurrentUser();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.passwordCheck = this.currentUser.getPassword();
    this.deleteCheckBox = false;
  }

  deleteProfile() {
    if (this.currentUser != null) {
      this.currentUser.deactivateUser();
      this.sessionService.updateUser(this.currentUser);
      this.sessionService.signOff();
      this.router.navigate(['']);
      this.dialogRef.close();
      this.openSnackBar("Account deleted succesfully")
     }
  }
  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: this.SNACKBAR_DURATION,
    });
  }
}
