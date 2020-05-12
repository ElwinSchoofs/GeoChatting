import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteUserDialogComponent} from "./users-dialog/delete-user-dialog/delete-user-dialog.component";
import {UserService} from "../../../services/repositories/user.service";
import {User} from "../../../model/user";
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private readonly DIALOG_WIDTH: string = '600px';
  private users: User[];


  constructor(public dialog: MatDialog, private userService: UserService, private sessionService:SessionService) {
    this.users = this.userService.getUsers();
  }

  ngOnInit() {
  }

  deleteUserDialog(_id: number) {
    this.dialog.closeAll();
    this.dialog.open(DeleteUserDialogComponent, {
      width: this.DIALOG_WIDTH
    });

  }

  toggleAdmin(user: User){
    this.sessionService.getUserRepository().update(user).toPromise();
  }

  public getAll(){
    this.userService.getUsers();
  }
}
