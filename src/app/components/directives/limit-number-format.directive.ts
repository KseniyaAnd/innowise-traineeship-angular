import { Directive, ElementRef, HostListener, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appLimitNumberFormat]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LimitNumberFormatDirective),
      multi: true
    }
  ]
})
export class LimitNumberFormatDirective implements ControlValueAccessor {
  @Input() maxSize: number = Number.MAX_VALUE;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value: string = input.value;

    if (parseFloat(value) > this.maxSize || parseFloat(value) < 0) {
      value = this.formatValue(value);
      input.value = value;
    }

    this.onChange(value);
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

  writeValue(value: any): void {
    this.el.nativeElement.value = value || '';
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }
}
