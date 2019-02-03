import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AddObjectPage} from "../add-object/add-object";
import { RestProvider } from "../../providers/rest/rest";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginCredential = { login: '', password: ''};
  registerCredential = {login: '', password: '', password2: '', name: '', surname: ''}


  constructor(public restProvider: RestProvider, public navCtrl: NavController, private alertCtrl: AlertController) {

  }

  sendRegister(newUser) {
    this.restProvider.addUser(newUser);
  }

  goLogin() {
    if(this.loginCredential.login.length==0 || this.loginCredential.password.length==0) {
      this.showError("Wypełnij wszystkie pola");
    }
    else {
      this.navCtrl.push(AddObjectPage);
    }
  }
  update(){
    window.location.reload();
  }

  goRegister() {
    if(this.registerCredential.login.length==0 || this.registerCredential.password.length==0 || this.registerCredential.password2.length==0 || this.registerCredential.name.length==0 || this.registerCredential.surname.length==0) {
      this.showError("Wypełnij wszystkie pola");
    }
    else if(this.registerCredential.password != this.registerCredential.password2) {
      this.showError("Hasła są różne");
    }
    else {
      let newUser = {
        "login": this.registerCredential.login,
        "name": this.registerCredential.name,
        "surname": this.registerCredential.surname,
        "password": this.registerCredential.password
      }
      this.sendRegister(newUser);
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
