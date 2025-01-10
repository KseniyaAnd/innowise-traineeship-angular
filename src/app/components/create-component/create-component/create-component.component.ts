import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {FocusDirective} from '../../directives/focus.directive';
import {ProductService} from '../../../services/product.service';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-create-component',
  imports: [
    ReactiveFormsModule,
    NgIf,
    FocusDirective
  ],
  templateUrl: './create-component.component.html',
  standalone: true,
})
export class CreateComponentComponent implements OnInit {
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
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
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
      this.modalService.close()
    })
  }
}
