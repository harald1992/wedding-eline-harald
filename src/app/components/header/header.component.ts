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

  get daysLeftForWedding() {
    const today = new Date();
    const weddingDate = new Date('2024-11-17');

    const dt = weddingDate.getTime() - today.getTime();
    const dayInMs = 1000 * 60 * 60 * 24;

    const daysLeft = Math.ceil(dt / dayInMs);
    return daysLeft;
  }
}
