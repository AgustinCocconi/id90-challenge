import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-error-footer',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './shared-error-footer.component.html',
  styleUrls: ['./shared-error-footer.component.scss']
})
export class SharedErrorFooterComponent {
  @Input() errorMessage = '';
}
