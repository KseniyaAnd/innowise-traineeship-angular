import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ProductService} from '../../../../../services/product.service';
import {FocusDirective} from '../../../../directives/focus.directive';
@Component({
  selector: 'app-product-add',
  imports: [
    ReactiveFormsModule,
    NgIf,
    FocusDirective,
    FocusDirective
  ],
  standalone: true,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.minLength(6),
      Validators.required
    ])
  })

  get title() {
    return this.form.controls.title as FormControl
  }

  constructor(
    private productService: ProductService,
  ) {
  }

  submit() {
    this.productService.create({
      title: this.form.value.title as string,
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: 'electronic',
      rating: {
        rate: 42,
        count: 1
      }
    }).subscribe(() => {
    })
  }
}
