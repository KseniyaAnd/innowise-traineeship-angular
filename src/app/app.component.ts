import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {IProduct} from './models/products';
import {ProductsListComponent} from './components/pages/product-page/components/products-list/products-list.component';
import {ProductService} from './services/product.service';
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
