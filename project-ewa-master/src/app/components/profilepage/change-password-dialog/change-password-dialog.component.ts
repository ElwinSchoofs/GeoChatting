import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-profilepage-change-password-dialog',
  templateUrl: 'change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent {

  constructor(public dialogRef: MatDialogRef<ChangePasswordDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
