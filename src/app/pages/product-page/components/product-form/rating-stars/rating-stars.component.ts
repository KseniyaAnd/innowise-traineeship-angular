import {Component, forwardRef, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons/faStar'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'app-rating-stars',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './rating-stars.component.html',
    styleUrl: './rating-stars.component.css',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RatingStarsComponent),
            multi: true
        }
    ]
})
export class RatingStarsComponent implements ControlValueAccessor{
    faStar = faStar;
    rating = 0;
    disabled = true;


    setRating(value: number) {
        if (this.disabled) return
        this.rating = value
    }

    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: () => void): void {
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    writeValue(obj: any): void {
        this.rating = Math.trunc(obj);
    }
}
