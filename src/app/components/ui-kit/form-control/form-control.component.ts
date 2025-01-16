import {booleanAttribute, Component, Input} from '@angular/core';

@Component({
  selector: 'app-form-control',
  imports: [],
  templateUrl: './form-control.component.html',
  standalone: true
})
export class FormControlComponent {
  @Input () label: string
  @Input ({transform: booleanAttribute}) required: boolean
    // NgControl
}
