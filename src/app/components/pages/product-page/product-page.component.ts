import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {InputTextModule} from 'primeng/inputtext';
import {IProduct} from '../../../models/products';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ProductAddComponent} from './components/product-add/product-add.component';

@Component({
  selector: 'app-products-list-page',
  standalone: true,
  imports: [
    NgIf,
    ProductsListComponent,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
  ],
  providers: [DialogService],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit{
  title = 'angular-trainee';
  products: IProduct[] = [];
  loading = false
  term = ''
  ref: DynamicDialogRef;

  constructor(
    public productsService: ProductService,
    private dialogService: DialogService,
  ) {
  }

  show() {
    this.ref = this.dialogService.open(ProductAddComponent, {
      data: {},
      header: 'Product Details',
      width: '50%',
      dismissableMask: true,
      modal: true
    });
  }

  ngOnInit(): void {
    this.loading = true
    this.productsService.getAll().subscribe((products) => {
      console.log(products)
      this.loading = false
      this.products = products;
      // this.cdr.markForCheck();
    })
  }

}
