import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AddObjectPage} from "../add-object/add-object";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginCredential = { username: '', password: ''};
  registerCredential = {username: '', password: '', password2: ''}


  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }

  goLogin() {
    if(this.loginCredential.username.length==0 || this.loginCredential.password.length==0) {
      this.showError("Wypełnij wszystkie pola");
    }
    else {
      this.navCtrl.push(AddObjectPage);
    }
  }

  goRegister() {
    if(this.registerCredential.username.length==0 || this.registerCredential.password.length==0 || this.registerCredential.password2.length==0) {
      this.showError("Wypełnij wszystkie pola");
    }
    if(this.registerCredential.password != this.registerCredential.password2) {
      this.showError("Hasła są różne");
    }
  }

  showError(text) {

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
