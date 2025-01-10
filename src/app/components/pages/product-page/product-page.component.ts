import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {CreateComponentComponent} from '../../create-component/create-component/create-component.component';
import {FilterProductsPipe} from '../../../pipes/filter-products.pipe';
import {ModalComponent} from '../../modal/modal/modal.component';
import {ProductComponent} from '../../product/product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    AsyncPipe,
    CreateComponentComponent,
    FilterProductsPipe,
    ModalComponent,
    NgForOf,
    NgIf,
    ProductComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit{
  title = 'angular-trainee';
  //products: IProduct[] = [];
  loading = false
  // products$: Observable<IProduct[]>
  term = ''

  // TODO Механизм обнаружения изменений в Angular,  changeDetection: ChangeDetectionStrategy.OnPush, ChangeDetectorRef и методы ChangeDetectorRef

  constructor(
    public productsService: ProductService,
    public modalService: ModalService
  ) {
  }

  // TODO прочитать про хуки жизненного цикла
  ngOnInit(): void {
    this.loading = true
    // this.products$ =  this.productsService.getAll().pipe(
    //   tap(() => this.loading = false)
    // )
    this.productsService.getAll().subscribe(products => {
      console.log(products)
      this.loading = false
      // this.cdr.markForCheck();
    })
  }

}
