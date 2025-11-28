import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,  ]
})
export class AboutPage {
  constructor() {}
}
