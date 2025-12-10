import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { informationCircleOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle,
    IonButtons, IonButton, IonIcon,
    RouterLink
  ]
})
export class HeaderComponent {

  constructor() {
    addIcons({
      informationCircleOutline,
      settingsOutline
    });
  }

}
