import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {ProductsListComponent} from './containers/products-list/products-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {InputTextModule} from 'primeng/inputtext';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ProgressSpinner} from 'primeng/progressspinner';
import {ProductFormComponent} from './components/product-form/product-form.component';

@Component({
  selector: 'app-products-list-page',
  standalone: true,
  imports: [
    NgIf,
    ProductsListComponent,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ProgressSpinner,
    AsyncPipe,
  ],
  providers: [DialogService],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
  private productsService = inject(ProductService);

  products = this.productsService.products;
  loading = this.productsService.loading;

  title = 'angular-trainee';
  term = ''
  ref: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
  ) {
  }

  show() {
    this.ref = this.dialogService.open(ProductFormComponent, {
      data: {},
      header: 'Product Create',
      width: '50%',
      dismissableMask: true,
      modal: true
    });
  }

  ngOnInit(): void {
    this.productsService.getAll();
  }

}
