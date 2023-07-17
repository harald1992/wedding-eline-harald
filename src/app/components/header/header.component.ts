import { Component } from '@angular/core';

interface MenuItem {
  isExternal?: boolean;
  link: string;
  title: string;
  label: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuItems: MenuItem[] = [
    {
      link: '/',
      title: 'Navigeer naar homepagina',
      label: 'Home',
    },
    {
      link: '/photos',
      title: 'Navigate to photos',
      label: 'Photos',
    },
    {
      link: '/party',
      title: 'Navigate to party',
      label: 'Party',
    },
  ];
}
