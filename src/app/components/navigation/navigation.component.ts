import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
  ],
  templateUrl: './navigation.component.html',
  standalone: true
})
export class NavigationComponent {

}
