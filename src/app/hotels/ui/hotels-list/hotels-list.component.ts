import { Component, Input } from '@angular/core';
import { Hotel } from 'src/app/shared/interfaces/hotel.interface';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss']
})
export class HotelsListComponent {
  @Input() hotels!: Hotel[];
}
