import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SessionService} from "../../../services/session.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'app-login-or-register-dialog',
  templateUrl: './login-or-register-dialog.component.html',
  styleUrls: ['./login-or-register-dialog.component.scss']
})
export class LoginOrRegisterDialogComponent implements OnInit {

  @ViewChild('repeatPassword' , {static: false}) repeatPasswordRef: ElementRef;
  @ViewChild('myForm', {static: false}) myForm: HTMLFormElement;
  hide = true;
  private form: NgForm;
  private nickName: string;
  private eMail: string;
  private passWord: string;
  private repeatPassWord: string;
  private readonly SNACKBAR_DURATION = 5000;

  constructor(public sessionService: SessionService, public dialogRef: MatDialogRef<LoginOrRegisterDialogComponent>, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  checkPassword(){
    this.myForm.controls['repeatPassword'].setErrors({'incorrect': true});
    if(this.repeatPassWord == this.passWord){
      this.myForm.controls['repeatPassword'].setErrors(null);
    }
  }
  /**
   *log in function
   */
  signIn() {
    const returnCode = this.sessionService.signIn(this.eMail, this.passWord);
    if(returnCode == 0) {
      this.dialogRef.close();
      this.openSnackBar("Log In Succesful")
    }else if(returnCode == 1){
      this.openSnackBar("Wrong credentials")
    }else{
      this.openSnackBar("Something went wrong")
    }
  }


  /**
   * register function
   */
  signUp() {
    const returnCode = this.sessionService.signUp(this.eMail, this.nickName, this.passWord);
    if(returnCode == 0) {
      this.dialogRef.close();
      this.openSnackBar("Register Succesful")
    }else if(returnCode == 1){
      this.openSnackBar("Register Unsuccesful")
    }else{
      this.openSnackBar("Something went wrong")
    }
  }
  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: this.SNACKBAR_DURATION,
    });
  }

}
