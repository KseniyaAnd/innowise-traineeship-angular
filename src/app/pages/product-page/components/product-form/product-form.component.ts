import {Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../../../services/product.service';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Categories, IProduct, IProductCreate, IProductUpdate} from '../../../../models/products';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Select} from 'primeng/select';
import {Textarea} from 'primeng/textarea';
import {FormControlComponent} from '../../../../components/ui-kit/form-control/form-control.component';
import {NumberFormatDirective} from '../../../../components/directives/number-format.directive'
import {NgIf} from '@angular/common';
import {LimitNumberFormatDirective} from '../../../../components/directives/limit-number-format.directive';
import {IGroupFormProducts} from '../../../../models/group-form-products';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    InputText,
    Button,
    Select,
    Textarea,
    FormControlComponent,
    NumberFormatDirective,
    NgIf,
    LimitNumberFormatDirective
  ],
  standalone: true,
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  private productsService = inject(ProductService);
  private destroyRef = inject(DestroyRef);
  protected readonly categories = [...Categories];
  productForm: FormGroup<IGroupFormProducts>;
  disability = true;
  updating = false;

  loading = false;

  product: IProduct;

  ngOnInit() {
    this.product = this.config.data.product;
    (this.product) ? this.disability = true : this.disability = false;
    this.productForm = this._createForm(this.product);
  }

  constructor(
    private productService: ProductService,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
  }

  createNewBodyforCreate() {
     const updateBody: IProductCreate = {
      title: this.productForm.controls.title.value,
      price: this.productForm.controls.price.value,
      description: this.productForm.controls.description.value,
      image: this.productForm.controls.image.value,
      category: this.productForm.controls.category.value,
      rating: {
        rate: this.productForm.get('rating.rate')?.value as number,
        count: this.productForm.get('rating.count')?.value as number,
      }
    };

    return updateBody;
  }

  createNewBodyforUpdate() {
    const updateBody: IProductUpdate = {
      id: this.productForm.controls.id.value,
      title: this.productForm.controls.title.value,
      price: this.productForm.controls.price.value,
      description: this.productForm.controls.description.value,
      category: this.productForm.controls.category.value,
      rating: {
        rate: this.productForm.get('rating.rate')?.value as number,
        count: this.productForm.get('rating.count')?.value as number,
      }
    };

    return updateBody;
  }

  close() {
    this.dialogRef.close();
  }

  updatingToggle() {
    this.updating = !this.updating;
    this.disability = !this.disability;
    if (this.disability) {
      this.productForm.disable();
    } else {
      this.productForm.enable();
    }
  }

  update() {
    this.loading = true;

    const updatedBody: IProductUpdate = this.createNewBodyforUpdate();

    this.productService.update(updatedBody).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.loading = false;
        this.dialogRef.close();
      },
      error: () => {
        this.loading = false;
      },
    });
  }


  save() {
    this.loading = true;

    const updatedBody: IProductCreate = this.createNewBodyforCreate();

    this.productService.create(updatedBody).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.loading = false;
        this.dialogRef.close();
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  _createForm(product: IProduct): FormGroup {
    return new FormGroup({
      id: new FormControl<number>({value: product?.id || 0, disabled: this.disability}, [Validators.required]),
      title: new FormControl<string>({value: product?.title || '', disabled: this.disability}, [Validators.required]),
      price: new FormControl<number>({value: product?.price || 0, disabled: this.disability}, [Validators.required]),
      description: new FormControl<string>({value: product?.description || '', disabled: this.disability}),
      category: new FormControl<string>({value: product?.category || '', disabled: this.disability}),
      image: new FormControl<string>({value: product?.image || '', disabled: this.disability}),
      rating: new FormGroup({
        rate: new FormControl<number>({value: product?.rating?.rate || 0, disabled: this.disability}, [Validators.required]),
        count: new FormControl<number>({value: product?.rating?.count || 0, disabled: this.disability}, [Validators.required]),
      }),
    });
  }
}
