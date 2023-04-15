import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletEvent, Map, MapOptions, Marker, latLng, tileLayer } from 'leaflet';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, LeafletModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Output() map$: EventEmitter<Map> = new EventEmitter<Map>();
  @Output() zoom$: EventEmitter<number> = new EventEmitter<number>();
  @Input() markers: Marker[] = [];
  @Input() options: MapOptions = {
    layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.7,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })],
    zoom: 6,
    center: latLng(0, 0),

  };
  public map!: Map;
  public zoom!: number;
  ngOnInit() {
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);

    if (this.markers.length) {
      this.markers.forEach((marker: Marker) => {
        marker.addTo(this.map);
      });
    }
  }

  onMapZoomEnd(e: LeafletEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners();
    this.map.remove();
  }
}
