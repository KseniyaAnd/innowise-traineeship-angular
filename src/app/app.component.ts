import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {IProduct} from './models/products';
import {ProductComponent} from './components/product/product.component';
import {ProductService} from './services/product.service';
import {Observable, tap} from 'rxjs';
import {GlobalErrorComponent} from './components/global-error/global-error/global-error.component';
import {FormsModule} from '@angular/forms';
import {FilterProductsPipe} from './pipes/filter-products.pipe';
import {ModalComponent} from './components/modal/modal/modal.component';
import {CreateComponentComponent} from './components/create-component/create-component/create-component.component';
import {ModalService} from './services/modal.service';
import {RouterOutlet} from '@angular/router';
import {NavigationComponent} from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [
    UpperCasePipe,
    ProductComponent,
    NgForOf,
    NgIf,
    AsyncPipe,
    GlobalErrorComponent,
    FormsModule,
    FilterProductsPipe,
    ModalComponent,
    CreateComponentComponent,
    RouterOutlet,
    NavigationComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
