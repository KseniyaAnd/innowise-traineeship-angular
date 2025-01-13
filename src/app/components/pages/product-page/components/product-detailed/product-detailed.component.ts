import {Component} from '@angular/core';
import {IProduct} from '../../../../../models/products';
import {Button} from 'primeng/button';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-detailed',
  templateUrl: './product-detailed.component.html',
  imports: [
    Button,
    CurrencyPipe,
  ],
  standalone: true
})
export class ProductDetailedComponent {
  product: IProduct;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.product = this.config.data.product;
  }

  close() {
    this.ref.close();
  }
}
