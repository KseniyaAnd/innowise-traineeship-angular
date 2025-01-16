import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {
  @Input() filterTerm: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterTerm']) {
      this.highlightText();
    }
  }

  private highlightText() {

    const text = this.el.nativeElement.textContent;
    if (this.filterTerm && text) {
      const regex = new RegExp(`(${this.filterTerm})`, 'gi');
      const newText = text.replace(regex, `<mark>$1</mark>`);
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', newText);
    }
  }
}
