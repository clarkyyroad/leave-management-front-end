import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {
  @Input() errorCode!: string;
  @Input() errorMessage!: string;
  @Input() showModal!: boolean;
  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }
}
