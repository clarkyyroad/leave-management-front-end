import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-user-selection-modal',
  templateUrl: './user-selection-modal.component.html',
  styleUrls: ['./user-selection-modal.component.css']
})
export class UserSelectionModalComponent {
    @Output() closeModalEvent = new EventEmitter();

    closeModal() {
        this.closeModalEvent.emit();
    }
}
