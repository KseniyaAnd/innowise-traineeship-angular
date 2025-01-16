import {Component} from '@angular/core';
import {GlobalErrorComponent} from './components/global-error/global-error/global-error.component';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {NavigationComponent} from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [
    GlobalErrorComponent,
    FormsModule,
    RouterOutlet,
    NavigationComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
