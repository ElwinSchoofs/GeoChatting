import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-show-information-dialog',
  templateUrl: './show-information-dialog.component.html',
  styleUrls: ['./show-information-dialog.component.scss']
})
export class ShowInformationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShowInformationDialogComponent>) { }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }

}
