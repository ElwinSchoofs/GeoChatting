import {EventEmitter, Injectable} from '@angular/core';
import {User} from '../model/user';
import {Router} from "@angular/router";
import {PostService} from "./repositories/post.service";
import {Gps} from "../model/gps";
import {UserService} from "./repositories/user.service";
import {SettingsService} from "./repositories/settings.service";
import {Setting} from "../model/setting";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  currentUser = new EventEmitter<User>();
  settings = new EventEmitter<Setting>();
  internalCurrentUser;
  setting;

  currentGps = new EventEmitter<Gps>();
  private internalGps: Gps;

  private internalCurrentSettings: Setting[];
  private settingsSubscription: any;

  /**
   * Makes sure there's a data source available for the application.
   */
  constructor(
    private userRepository: UserService,
    private postRepository: PostService,
    private settingRepository: SettingsService,
    public router: Router) {
    this.settingsSubscription = this.settingRepository.findAll().subscribe(
      (settings: Setting[]) => {
       this.internalCurrentSettings = settings.map(setting => Setting.returnObject(setting));
      },
      (error) => {
        console.log("Error: Status " + error.status + " - " + error.error);
      });
  }

  public getUserRepository(): UserService {
    return this.userRepository;
  }

  public getPostRepository(): PostService {
    return this.postRepository;
  }

  public getSettingsRepository(): SettingsService {
    return this.settingRepository;
  }

  updateCurrentSettings(settings: Setting[]) {
    this.internalCurrentSettings = settings;
    for (let setting of this.internalCurrentSettings) {
      this.getSettingsRepository().update(setting).subscribe();
    }
  }

  signUp(eMail: string, nickName: string, passWord: string): number {
      const user = new User(eMail, passWord, nickName);
      this.userRepository.save(user).toPromise();
      this.currentUser.emit(user);
      this.internalCurrentUser = user;
      return 1;
  }

  signIn(eMail: string, passWord: string): number {
    for (let i = 0; i < this.userRepository.getUsers().length; i++) {
      if (
        this.userRepository.getUsers()[i].getPassword() == passWord &&
        this.userRepository.getUsers()[i].getEmail() == eMail &&
        this.userRepository.getUsers()[i].getIsActive() == true) {
        this.currentUser.emit(this.userRepository.getUsers()[i]);
        this.internalCurrentUser = this.userRepository.getUsers()[i];
        this.userRepository.getUsers()[i].getEmail();
        console.log(this.internalCurrentUser);
        return 0;
      }
    }
    return 1;
  }




  saveCurrentLocation(gps: Gps) {
    if (gps) {
      this.currentGps.emit(gps);
      this.internalGps = gps;
    } else {

    }
  }

  getCurrentUser(): User {
    return this.internalCurrentUser;
  }

  getCurrentSettings(){
    return this.internalCurrentSettings;
  }


  setCurrentUser(user: User){
    this.internalCurrentUser = user;
    this.currentUser.emit(user);
  }

  signOff() {
    this.currentUser.emit(null);
    this.internalCurrentUser = null;
  }

  getIndex(user: User): number {
    for (let i = 0; this.userRepository.getUsers().length > i; i++) {
      console.log(this.userRepository.getUsers()[i]);
      if (this.userRepository.getUsers()[i].equals(user)) {
        return i;
      }
    }
    console.log("non existent user");
  }

  updateUser(user: User) {
    const arrayIndex = this.getIndex(this.internalCurrentUser);
    console.log(arrayIndex);
    this.userRepository.update(user).toPromise();
    this.internalCurrentUser = this.userRepository.getUsers()[arrayIndex];
    this.currentUser.emit(this.internalCurrentUser);
  }

  deleteUser(user: User) {
    this.userRepository.deleteById(user.getId()).toPromise();
  }

  getInternalGps(): Gps {
    return this.internalGps;
  }


  updateSettings(setting: Setting) {
    const arrayIndex = this.getIndex(this.setting);
    console.log(arrayIndex);
    this.settingRepository.update(setting).toPromise();
    this.setting = this.settingRepository.getSetting()[arrayIndex];
    this.settings.emit(this.setting);
  }



}
