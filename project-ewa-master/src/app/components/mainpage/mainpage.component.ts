import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {MatDialog} from '@angular/material/dialog';
import {CreatePostDialogComponent} from './create-post-dialog/create-post-dialog.component';
import {ShowInformationDialogComponent} from './show-information-dialog/show-information-dialog.component';
import {Post} from '../../model/post';
import {PointsService} from '../../services/points.service';
import {LoginOrRegisterDialogComponent} from "./login-or-register-dialog/login-or-register-dialog.component";
import {User} from "../../model/user";
import {Subscription} from "rxjs";
import {Gps} from "../../model/gps";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Setting} from "../../model/setting";
import {SettingsService} from "../../services/repositories/settings.service";
import {parseProperty} from "@angular/compiler/src/render3/view/styling_builder";

declare let L;
declare let M;

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit, OnDestroy {
  private readonly INACCURATE_START_RADIUS: number = 15;
  private readonly DIALOG_WIDTH: string = '600px';
  private readonly MAX_ZOOM_LEVEL = 19;
  private readonly DEFAULT_ZOOM_LEVEL = 16;
  private readonly DEFAULT_LAT = 52.36015051507675; // 52.092876
  private readonly DEFAULT_LONG = 4.908598859032622; // 5.104480
  private readonly SNACKBAR_DURATION = 5000;
  private readonly COMMUNITY_CREATED_POST_ICON = L.icon({
    iconUrl: 'assets/img/community-created-post.png',
    iconSize: [48, 48],
    iconAnchor: [10, 46],
    popupAnchor: [0, -48],
  });
  private readonly USER_CREATED_POST_ICON = L.icon({
    iconUrl: 'assets/img/user-created-post.png',
    iconSize: [48, 48],
    iconAnchor: [10, 46],
    popupAnchor: [0, -48],
  });
  private circle: any;
  private posts: Post[];
  private map: any;
  private _gpsCoordinates: Gps;
  currentUser: User;
  private currentPoints = 0;
  private postSubscription: Subscription;
  private currentSettings: Setting[];
  private messageRadius: String;
  private settingsSubscription: Subscription;

  constructor(
    private sessionService: SessionService,
    private pointsService: PointsService,
    private settingsService: SettingsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {
    this.posts = [];
    this.currentSettings = [];
    this.currentUser = sessionService.getCurrentUser();
    this.sessionService.currentUser.subscribe(currentUser => {
      // Update markers so signed in user can divide its own markers with others' right after signing in
      if(this.currentUser !== currentUser){
        this.currentUser = currentUser;
        this.currentPoints = +currentUser.getPoints();
        this.updateMarkersOnMap();
      }
      this.currentUser = currentUser;
    });


    /**
     * connecting the radius and points from the back-end
     * to be used in the front-end
     */
    this.settingsSubscription = this.sessionService.getSettingsRepository().findAll().subscribe(
      (settings: Setting[]) => {
        console.log(settings);
        this.currentSettings = settings.map(setting => Setting.returnObject(setting));
        console.log(this.currentSettings);
        this.messageRadius = this.currentSettings[1].getContent();
         this.currentPoints = Number(this.currentSettings[2].getContent());
        console.log(this.currentPoints + " "+ "points" + " "+"mainpageComponent");
      });



    this._gpsCoordinates = sessionService.getInternalGps();
    this.sessionService.currentGps.subscribe(_currentGps => this._gpsCoordinates = _currentGps);
    if(this.currentUser) {
      this.currentPoints = this.currentUser.getPoints();
      this.currentPoints = +this.currentSettings[2].getContent();
      this.currentUser.points.subscribe(points => this.currentPoints = points);
    }

    this.currentSettings = (sessionService.getCurrentSettings());

  }

  mapSettings(): void {
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: this.MAX_ZOOM_LEVEL,
    }).addTo(this.map);

    L.control.zoom({
      position: 'bottomleft'
    }).addTo(this.map);
  }

  updateMarkersOnMap(): void {
    let markerIcon;
    let markers = [];
    let post: Post;
    for (let i = 0; i < this.posts.length; i++) {
      post = this.posts[i];

      if(this.currentUser !== undefined
        && this.currentUser !== null
        && this.currentUser.id === post.createdBy.id) {
        markerIcon = this.USER_CREATED_POST_ICON;
      } else {
        markerIcon = this.COMMUNITY_CREATED_POST_ICON;
      }
      const marker = L.marker([post.latitude, post.longitude], {icon: markerIcon, markerIndex: i});
      markers[i] = {message: post.message, marker: marker, createdBy: post.createdBy};

      marker.addTo(this.map).addEventListener('click', (e) => {

        if(this.currentUser) {
          const coordinates = new L.latLng(e.latlng.lat, e.latlng.lng);
          const OPENING_RADIUS = this.messageRadius;

          if (coordinates.distanceTo(new L.latLng(this._gpsCoordinates.latitude, this._gpsCoordinates.longitude)) < OPENING_RADIUS) {
            let selectedMarkerIndex = e.target.options.markerIndex;

            // Users shouldn't be able to open up their own posts to earn points
            if(markers[selectedMarkerIndex].createdBy.id !== this.currentUser.id) {

              const popup = markers[selectedMarkerIndex].marker.bindPopup(markers[selectedMarkerIndex].message + "<br /><br /> Posted by: " + markers[selectedMarkerIndex].createdBy.nickname);
              popup.addTo(this.map);
              markers[selectedMarkerIndex].marker.openPopup();
              this.pointsService.postAddView(this.posts[selectedMarkerIndex]);
              this.currentPoints = this.currentUser.getPoints();
            }
          }else {
            this.openSnackBar("You are to far away to open up this post");
            console.log("You are to far away")
          }
        }else {
          console.log("You need to be logged in to open a message")
          this.openSnackBar("You need to be logged in to open any posts");
        }
      });
    }
  }

  openCreatePostDialog(): void {
    this.dialog.closeAll();
    // Only allow the user to create a new post if we got its gps coordinates
    if (this._gpsCoordinates != null) {
      const dialogRef = this.dialog.open(CreatePostDialogComponent, {
        width: this.DIALOG_WIDTH,
        data: {coordinates: this._gpsCoordinates, map: this.map}
      });
    }
  }

  openShowInformationDialog() {
    this.onOpenPage();
    this.dialog.closeAll();
    this.dialog.open(ShowInformationDialogComponent, {
      width: this.DIALOG_WIDTH
    });
  }

  openSignInDialog() {
    this.dialog.closeAll();
    this.dialog.open(LoginOrRegisterDialogComponent, {
      width: this.DIALOG_WIDTH
    });
  }

  ngOnInit() {
    if (this._gpsCoordinates !=null) {
      this.map = new L.map('map', {
        zoomControl: false
      }).setView([this._gpsCoordinates.latitude, this._gpsCoordinates.longitude], this.DEFAULT_ZOOM_LEVEL);

    } else {
      this.map = new L.map('map', {
        zoomControl: false
      }).setView([this.DEFAULT_LAT, this.DEFAULT_LONG], this.DEFAULT_ZOOM_LEVEL);
    }

    this.mapSettings();

    /**
     * nodig om functies van het model aan te roepen
     * anders wordt het niet als een officieel object gezien
     */
    this.postSubscription = this.sessionService.getPostRepository().findAll().subscribe(
      (posts: Post[]) => {
        this.posts = posts.map(post => Post.returnObject(post));

        if(this.posts.length > 0){
          this.updateMarkersOnMap();
        }
      },
      (error) => {
        console.log("Error: Status " + error.status + " - " + error.error);
      });


    this.map.addEventListener('locationfound', (e) => {
      let radius = e.accuracy;

      console.log(e);
      console.log(radius);

      // Let the user know the location may be inaccurate
      if (radius > this.INACCURATE_START_RADIUS) {
        radius = this.INACCURATE_START_RADIUS; // Disallow the circle to be too big
      }

      if (this.circle === undefined) {
        this.circle = new L.circle(e.latlng, radius).addTo(this.map);
      } else {
        this.circle.setLatLng(e.latlng);
      }

      this._gpsCoordinates = new Gps(e.latlng.lat, e.latlng.lng);
    });

    setInterval(this.locate(), 100);
  }


  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: this.SNACKBAR_DURATION,
    });
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  private locate(): any{
    this.map.locate({setView: true, watch: true, maxZoom: this.MAX_ZOOM_LEVEL});
  }

  private onOpenPage(): any {
    this.sessionService.saveCurrentLocation(this._gpsCoordinates);
  }

  get gpsCoordinates(): Gps {
    return this._gpsCoordinates;
  }
}
