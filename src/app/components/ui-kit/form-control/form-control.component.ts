import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-form-control',
  imports: [],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.css',
  standalone: true
})
export class FormControlComponent {
  @Input () label: string
    // NgControl
}
