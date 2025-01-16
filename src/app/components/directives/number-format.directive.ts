import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appNumberFormat]',
  standalone: true
})
export class NumberFormatDirective {
  private regex: RegExp = new RegExp(/^(?!0\d)\d{1,3}(\.\d{0,2})?$/);

  constructor(private el: ElementRef) {
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (!this.regex.test(value)) {
      value = this.formatValue(value);
      input.value = value;
    }
  }

  private formatValue(value: string): string {
    let numericValue = parseFloat(value);

    if (/^0[1-9]/.test(value)) {
      numericValue = parseFloat(value.replace(/^0+/, ''));
    }

    return isNaN(numericValue) ? '' : numericValue.toFixed(2);
  }
}
