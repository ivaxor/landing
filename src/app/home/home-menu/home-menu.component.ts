import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { KEY_CODE } from '../../../models/key-codes.model';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent {
  public menuItems: { index: number, text: string, url: string }[];
  public menuIndex: number;

  constructor(private router: Router) {
    this.menuItems = [
      { index: 0, text: 'About', url: '/about' },
      { index: 1, text: 'Links', url: '/links' },
      { index: 2, text: 'Exit', url: '/' }
    ];
    this.menuIndex = 0;
  }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KEY_CODE.UP_ARROW:
        if (this.menuIndex > 0) {
          this.menuIndex--;
        }
        break;

      case KEY_CODE.DOWN_ARROW:
        if (this.menuIndex < this.menuItems.length - 1) {
          this.menuIndex++;
        }
        break;

      case KEY_CODE.ENTER:
        const menu = this.menuItems[this.menuIndex];
        this.router.navigateByUrl(menu.url);
        break;
    }
  }
}
