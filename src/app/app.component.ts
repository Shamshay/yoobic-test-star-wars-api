import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Dashboard (Temp)',
      url: '/members/list',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/members/list',
      icon: 'list'
    },
    {
      title: 'Chat (Temp)',
      url: '/members/list',
      icon: 'chatboxes'
    }
  ];

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.authenticationService.authenticationState.subscribe(state => {
      if (state) {
        this.router.navigate(['members', 'list']);
        this.ionViewWillEnter(true);
      } else {
        this.router.navigate(['login']);
        this.ionViewWillEnter(false);
      }
    });
  }

  ionViewWillEnter(state: boolean) {
    this.menu.enable(state);
  }
}
