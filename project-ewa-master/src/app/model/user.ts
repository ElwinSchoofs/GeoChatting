import {EventEmitter} from "@angular/core";
import {Setting} from "./setting";

export class User {
  id: number;
  email: string;
  password: string;
  nickname: string;
  isAdmin: boolean;
  totalPoints: number;
  isActive: boolean;
  points = new EventEmitter<number>();

  /**
   * Creates a new instance of User class.
   *
   * @param email User's email
   * @param password User's password
   * @param nickname User's nickname
   */
  constructor(email: string, password: string, nickname: string, isAdmin?: boolean) {
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.isAdmin = (isAdmin) ? isAdmin : false;
    this.totalPoints = 0;
    this.isActive = true;
  }

  deactivateUser() {
    this.isActive = false;
  }

  reActivateUser() {
    this.isActive = true;
  }

  makeAdmin() {
    this.isAdmin = true;
  }

  unAdmin() {
    this.isAdmin = false;
  }

  givePoints(points: number) {
    this.totalPoints += points;
    this.points.emit(this.totalPoints);
  }

  getPoints() {
    return this.totalPoints;
  }

  getPassword() {
    return this.password;
  }

  getEmail(){
    return this.email;
  }

  getNickname(){
    return this.nickname;
  }

  getIsAdmin(){
    return this.isAdmin;
  }

  getId(){
    return this.id;
  }

  equals(user: User): boolean{
    return this.id == user.getId();
  }

  static returnObject(user: User){
    let newUser: User = new User(user.email,user.password, user.nickname);
    newUser.id = user.id;
    newUser.isActive = user.isActive;
    newUser.isAdmin = user.isAdmin;
    newUser.totalPoints = user.totalPoints;
    return newUser;
  }

  setNickname(nickname){
    this.nickname = nickname;
  }

  setEmail(email){
    this.email = email;
  }

  getIsActive(){
    return this.isActive;
  }

}
