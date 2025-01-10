import {Component, OnInit} from '@angular/core';
import {ErrorService} from '../../../services/error.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-global-error',
  imports: [
    AsyncPipe,
    NgIf
  ],
  standalone: true,
  templateUrl: './global-error.component.html',
})
export class GlobalErrorComponent implements OnInit {
  constructor(public errorService: ErrorService) {
  }

  ngOnInit():void {

  }
}
