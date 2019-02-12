import { Component, ViewChild } from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AcceptPage } from '../pages/accept/accept';
import { AddObjectPage } from "../pages/add-object/add-object";
import { AuthServiceProvider } from "../providers/auth-service/auth-service";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public events : Events, public authService: AuthServiceProvider, public platform: Platform, public statusBar: StatusBar) {
    this.initializeApp();
    this.initializeMenu()
    events.subscribe('user:created', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', user, 'at', time);
      this.initializeMenu();
    });
    events.subscribe('user:logout', (time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Logout', 'at', time);
      this.initializeMenu();
    });
  }

  initializeMenu() {
    if(this.authService.currentUser == null) {
      this.pages = [
          { title: 'Mapa', component: HomePage },
          { title: 'Zaloguj', component: LoginPage },
      ];
    } else if (this.authService.currentUser.superUser) {
      this.pages = [
          {title: 'Mapa', component: HomePage},
          {title: 'Akceptuj', component: AcceptPage},
          {title: 'Dodaj Obiekt', component: AddObjectPage},
          {title: 'Wyloguj', component: '' }
      ];
    } else {
      this.pages = [
          {title: 'Mapa', component: HomePage},
          {title: 'Dodaj Obiekt', component: AddObjectPage},
          {title: 'Wyloguj', component: '' }
        ];
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.title == "Wyloguj") {
      this.logout()
    } else{
      this.nav.setRoot(page.component);
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

  }

  logout() {
    this.authService.logout();
    this.nav.setRoot(HomePage);

  }

}
