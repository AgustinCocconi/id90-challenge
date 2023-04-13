import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accept-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accept-button.component.html',
  styleUrls: ['./accept-button.component.scss']
})
export class AcceptButtonComponent {
  @Input() buttonText = 'click me!'
  @Input() type = 'button';
  @Input() buttonHeight = 28;
  @Input() disabled!: boolean;
  @Output() click = new EventEmitter<void>();

  handleClick() {
    this.click.emit();
  }
}
