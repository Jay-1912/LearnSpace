import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  navBarOpen: Boolean = false;
  notificationOverlayOpen: Boolean = false;

  handleNavBar() {
    this.navBarOpen = !this.navBarOpen;
  }

  handleNotificationOverlay(){
    this.notificationOverlayOpen = !this.notificationOverlayOpen;
  }
}
