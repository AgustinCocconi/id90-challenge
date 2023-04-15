import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from 'src/app/shared/interfaces/hotel.interface';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
})
export class HotelCardComponent implements OnInit {
  @Input() hotel!: Hotel;
  currentImage!: string;
  timerId!: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.currentImage = this.hotel.image;
    }, 200);
  }

  onMouseOver() {
    if (!this.hotel.images.length) {
      return;
    }

    this.nextImage();

    this.timerId = setInterval(() => {
      this.nextImage();
    }, 3000);
  }

  nextImage() {
    const currentIndex = this.hotel.images?.indexOf(this.currentImage);
    if (currentIndex < this.hotel.images?.length - 1) {
      this.currentImage = this.hotel.images[currentIndex + 1];
    } else {
      this.currentImage = this.hotel.images[0];
    }
  }

  onMouseLeave() {
    clearInterval(this.timerId);
    this.currentImage = this.hotel.image;
  }
}

