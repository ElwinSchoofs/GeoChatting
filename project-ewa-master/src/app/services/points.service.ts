import {EventEmitter, Injectable} from '@angular/core';
import {Post} from '../model/post';
import {SessionService} from './session.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Setting} from "../model/setting";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private readonly SNACKBAR_DURATION = 5000;
  private currentUser;
  private messagePoints: Setting[]| number;
  private pointArray: number[];
  private settingsSubscription: Subscription;
  public currentPoints: number;


      constructor(private sessionService: SessionService,
              private _snackBar: MatSnackBar) {
    this.pointArray = [];
    this.messagePoints = this.sessionService.getCurrentSettings();
    this.messagePoints = [];
    this.settingsSubscription = this.sessionService.getSettingsRepository().findAll().subscribe(
      (settings: Setting[]) => {
        console.log(settings);
        this.messagePoints = settings.map(setting => Setting.returnObject(setting));
        // this.currentPoints = Number.isNaN(Number(this.messagePoints[2].getContent()));
        this.currentPoints = Number(this.messagePoints[2].getContent());


      });
  }

  postAddView(post: Post) {
    this.currentUser = this.sessionService.getCurrentUser(); // get current user
    const oldViews = post.getViews(); // get the views of the post
    if (!oldViews.includes(this.currentUser)) { // check if the player is in the point bracket
      if (oldViews.length <= this.pointArray.length) {
        this.currentUser.givePoints(this.pointArray[oldViews.length]); // add points to the player
        post.addView(this.currentUser); // add the viewer to the post
        this.sessionService.getUserRepository().addPoints(this.pointArray[oldViews.length], this.currentUser);
      } else {
        console.log("no points left");
        this.openSnackBar("Sorry there couldn't be any points obtained");
      }
    } else {
      console.log("message already opened");
      this.openSnackBar("You have already opened this message");
    }
    console.log(this.currentPoints + " " +  "points from pointService");

  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: this.SNACKBAR_DURATION,
    });
  }
}
