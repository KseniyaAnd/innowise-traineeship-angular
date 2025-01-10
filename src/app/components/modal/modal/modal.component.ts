import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-modal',
  imports: [],
  standalone: true,
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  @Input() title: string

  constructor(public modalService: ModalService) {
  }

  ngOnInit() {
  }
}
