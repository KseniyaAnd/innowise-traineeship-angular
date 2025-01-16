import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appLimitNumberFormat]',
  standalone: true
})
export class LimitNumberFormatDirective {
  @Input () maxSize: number = Number.MAX_VALUE;

  constructor(private el: ElementRef) {
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value: string = input.value;

    if (parseFloat(value) > this.maxSize || parseFloat(value) < 0 ) {
      value = this.formatValue(value);
      input.value = value;
    }
  }

  private formatValue(value: string): string {
    let numericValue = parseFloat(value);
    if (numericValue > this.maxSize) {
      numericValue = this.maxSize;
    }

    if (numericValue < 0) {
      numericValue = 0;
    }
    return numericValue.toString();
  }

}
