import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Post} from "../../../model/post";
import {SessionService} from "../../../services/session.service";
import {Gps} from "../../../model/gps";
import {Setting} from "../../../model/setting";

declare let L;

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.scss']
})
export class CreatePostDialogComponent implements OnInit {
  private readonly POST_SUCCESSFULLY_CREATED = "Your post is successfully created 🎉";
  private readonly SNACKBAR_DURATION = 5000;
  private readonly USER_CREATED_POST_ICON = L.icon({
    iconUrl: 'assets/img/user-created-post.png',
    iconSize: [48, 48],
    iconAnchor: [10, 46],
    popupAnchor: [0, -48],
  });
  private postLatitude: number;
  private postLongitude: number;
  private map: any;
  private postContent: string;
  private currentSettings: Setting[];
  // private setting: Setting;
  private messageLength: String;
  settingsSubscription: any;

  constructor(
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { coordinates: Gps, map: any },
    private _snackBar: MatSnackBar) {
    this.postLatitude = data.coordinates.latitude;
    this.postLongitude = data.coordinates.longitude;
    this.map = data.map;
    this.currentSettings = this.sessionService.getCurrentSettings();

    this.currentSettings = [];
    this.settingsSubscription = this.sessionService.getSettingsRepository().findAll().subscribe(
      (settings: Setting[]) => {
        console.log(settings);
        this.currentSettings = settings.map(setting => Setting.returnObject(setting));
        console.log(this.currentSettings);
        this.messageLength= this.currentSettings[3].getContent();
      },
      (error) => {
        console.log("Error: Status " + error.status + " - " + error.error);
      });

  }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onCreate() {
    let post: Post = new Post(this.postContent, this.postLatitude, this.postLongitude, this.sessionService.getCurrentUser());
    this.sessionService.getPostRepository().save(post).toPromise()
      .then((data: Post) => {
        if (data !== null) {
          let marker = L.marker([post.latitude, post.longitude], {icon: this.USER_CREATED_POST_ICON});
          let popup = marker.bindPopup(post.message);

          popup.addTo(this.map);

          this.dialogRef.close();
          this.openSnackBar(this.POST_SUCCESSFULLY_CREATED);
          this.resetData();
        }
      });
  }

  resetData() {
    this.postContent = null;
    this.postLatitude = null;
    this.postLongitude = null;
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: this.SNACKBAR_DURATION,
    });
  }


}
