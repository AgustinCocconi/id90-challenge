import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './shared-input.component.html',
  styleUrls: ['./shared-input.component.scss']
})
export class SharedInputComponent {
  @Input() id = 'input';
  @Input() label = '';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() whiteBackground = false;
  @Input() iconName!: string;
  @Input() type!: string;
  @Input() inputHeight = 28;

  @Input() showError = false;
  @Input() errorMessage = 'Este campo es requerido';

  @Output() onChange = new EventEmitter<string>();
  @Output() onFocus = new EventEmitter<void>();

  onChangeEmmit(event: KeyboardEvent) {
    const inputElem = event.target as HTMLInputElement;
    this.onChange.emit(inputElem.value);
  }

  onFocusEmmit() {
    this.onFocus.emit();
  }


}
