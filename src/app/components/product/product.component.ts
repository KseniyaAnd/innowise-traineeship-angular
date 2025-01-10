import {Component, Input} from '@angular/core'
import {IProduct} from '../../models/products';
import {CommonModule, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  imports: [
    CurrencyPipe,
    CommonModule
  ]
})
export class ProductComponent {
  @Input() product: IProduct

  details = false
}

