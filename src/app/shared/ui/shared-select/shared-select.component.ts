import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DisplayPipe } from '../../utils/pipes/display-pipe.pipe';

@Component({
  selector: 'app-shared-select',
  standalone: true,
  imports: [CommonModule, FormsModule, DisplayPipe],
  templateUrl: './shared-select.component.html',
  styleUrls: ['./shared-select.component.scss']
})
export class SharedSelectComponent {
  @Input() selectOptions!: any[];
  @Input() value!: any;
  @Input() labelText!: string;
  @Input() displayName = 'display_name';
  @Input() selectHeight = 48;
  @Output() onChange = new EventEmitter<any>();

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {

      // Close dropdown onclick outside
      document.addEventListener('click', (e) => {
        const toggle = document.querySelector('.dropdown__switch') as HTMLInputElement;
        const element = e.target as Element;

        if (element === toggle) { return; }

        const isDropdownChild = element?.closest('.dropdown__filter');

        if (!isDropdownChild && toggle) {
          toggle.checked = false;
        }
      });
    }, 200);
  }

  onChangeEmmit(option: any) {
    this.onChange.emit(option);
  }


}



