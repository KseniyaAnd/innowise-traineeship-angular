import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IProduct} from '../../../../../models/products';
import {Button} from 'primeng/button';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {Select} from 'primeng/select';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-detailed',
  templateUrl: './product-detailed.component.html',
  imports: [
    Button,
    InputText,
    Textarea,
    Select,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true
})
export class ProductDetailedComponent implements OnInit {
  product: IProduct;
  updating = false;
  categories: { name: string }[] = [];
  selectedCategory: { name: string } | undefined;
  productDetailsForm: FormGroup;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private cdr: ChangeDetectorRef
  ) {
    this
      .product = this.config.data.product;
    this
      ._createForm()
  }

  _createForm() {
    this.productDetailsForm = new FormGroup({
      title: new FormControl({value: this.product.title, disabled: true}),
      price: new FormControl({value: this.product.price, disabled: true}),
      description: new FormControl({value: this.product.description, disabled: true}),
      category: new FormControl({value: this.product.category, disabled: true}),
      rate: new FormControl({value: this.product.rating.rate, disabled: true}),
      count: new FormControl({value: this.product.rating.count, disabled: true}),
    })
  }

  update() {
    this.updating = !this.updating;

    if (this.updating) {
      this.productDetailsForm.enable();
    } else {
      this.productDetailsForm.disable();
    }
  }


  save() {
    if (this.productDetailsForm.valid) {
      const updatedCategory = this.productDetailsForm.get('category')?.value || this.product.category;

      this.product = {
        ...this.product,
        ...this.productDetailsForm.getRawValue(),
        category: updatedCategory,
      };

      this.updating = false;
      this.productDetailsForm.disable();
      this.close()
      this.cdr.detectChanges();
    }
  }


  close() {
    this.ref.close();
  }

  ngOnInit() {
    this.categories = [
      {name: 'men\'s clothing'},
      {name: 'jewelery'},
      {name: 'electronics'},
      {name: 'women\'s clothing'},
    ];

    const selectedCategory = this.categories.find(
      (category) => category.name === this.product.category
    );
    this.productDetailsForm.patchValue({category: selectedCategory});
  }
}
