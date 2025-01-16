import {Component, Input} from '@angular/core'
import {IProduct} from '../../../../models/products';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FilterProductsPipe} from '../../../../pipes/filter-products.pipe';
import {ProductCardComponent} from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    FilterProductsPipe,
    ProductCardComponent
  ]
})
export class ProductsListComponent {
  @Input() productsArr: IProduct[];
  @Input() filterTerm = ""
}

