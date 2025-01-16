import { FormControl, FormGroup } from '@angular/forms';

export interface IGroupFormProducts {
  id: FormControl<number>;
  title: FormControl<string>;
  price: FormControl<number>;
  description: FormControl<string>;
  category: FormControl<string>;
  image: FormControl<string>;
  rating: FormGroup<{
    rate: FormControl<number>;
    count: FormControl<number>;
  }>;
}
