import { Component, Input } from '@angular/core';
import { MenuItem } from '../header/header.component';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent {
  @Input() menuItems: MenuItem[] = [];
}
