import { Component } from '@angular/core';
import {Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel} from '@angular/router';
import {slideInAnimation} from './app.animation';
import {MessageService} from './messages/message.service';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  isLoading: boolean = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get messages(): boolean {
    return this.messageService.showMessages;
  }

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
    this.router.events.subscribe((routerEvent: Event) => this.checkRouter(routerEvent))
  }

  checkRouter(routerEvent: Event) {
    if(routerEvent instanceof NavigationStart) {
      this.isLoading = true
    }
    if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel) {
      this.isLoading = false;
    }
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigateByUrl('/welcome');
  }

  displayMessages(): void {
    this.messageService.showMessages = true;
    this.router.navigate([{outlets: {popup: ['messages']}}]);
  }

  hideMessages(): void {
    this.messageService.showMessages = false;
    this.router.navigate([{outlets: {popup: null}}])
  }

}
