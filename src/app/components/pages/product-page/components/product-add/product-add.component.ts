import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ProductService} from '../../../../../services/product.service';
import {FocusDirective} from '../../../../directives/focus.directive';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {ProgressSpinner} from 'primeng/progressspinner';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-product-add',
  imports: [
    ReactiveFormsModule,
    NgIf,
    FocusDirective,
    FocusDirective,
    InputText,
    Button,
    ProgressSpinner
  ],
  standalone: true,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  loading = false

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
    private dialogRef: DynamicDialogRef
  ) {
  }

  submit() {
    this.loading = true;

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
    }).subscribe({
      next: () => {
        this.loading = false;
        this.dialogRef.close();
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
