import {Component, Input} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {Button} from 'primeng/button';
import {IProduct} from '../../../../../models/products';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ProductDetailedComponent} from '../product-detailed/product-detailed.component';

@Component({
  selector: 'app-product-card',
  imports: [
    Button,
    CurrencyPipe,
  ],
  providers: [DialogService],
  templateUrl: './product-card.component.html',
  standalone: true,
})
export class ProductCardComponent {
  @Input() product: IProduct;

  details = false

  ref: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
  ) {
  }


  show() {
    this.ref = this.dialogService.open(ProductDetailedComponent, {
      data: {product: this.product},
      header: 'Product Details',
      width: '50%',
      dismissableMask: true,
      modal: true
    });
  }
}
