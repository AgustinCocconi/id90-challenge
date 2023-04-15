import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MapOptions, Marker, icon, latLng, marker, tileLayer } from 'leaflet';
import * as moment from 'moment';
import { BsModalRef, BsModalService, } from 'ngx-bootstrap/modal';
import { ModalOptions } from 'ngx-bootstrap/modal/modal-options.class';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { GetHotelsParams } from 'src/app/shared/interfaces/get-hotels-params.interface';
import { Hotel } from 'src/app/shared/interfaces/hotel.interface';
import * as fromRoot from '../../app-state';
import * as hotelsActions from '../../app-state/actions/hotels.actions';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private zoom!: number;
  hotels$: Observable<Hotel[] | null>;
  datePickerValue!: Date[];
  searchForm!: FormGroup;
  modalRef?: BsModalRef;
  mapOptions: MapOptions = {
    layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.7,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })],
    zoom: 11,
    center: latLng(0, 0)
  };
  markers: Marker[] = [];
  myIcon = icon({
    iconUrl: '../../assets/images/map-pin.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });


  constructor(
    private readonly store: Store,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {

    this.hotels$ = this.store.select(fromRoot.getHotels).pipe(
      takeUntil(this.destroy$),
      map(data => {
        const hotelWithLocation = data.hotels.find(hotel => hotel.location?.latitude);
        if (hotelWithLocation) {
          this.mapOptions.center = latLng(hotelWithLocation.location.latitude, hotelWithLocation.location.longitude);
        }
        this.markers = [
          ...this.markers,
          ...data.hotels.flatMap(hotel => marker(latLng(hotel.location?.latitude, hotel.location?.longitude), { icon: this.myIcon }).bindPopup(hotel.name))
        ];

        return data.hotels;
      })
    );

    const params: GetHotelsParams = {
      'guests': [2],
      'checkin': '2020-10-24',
      'checkout': '2020-10-25',
      'destination': 'Cancun',
      'keyword': '',
      'rooms': 1,
      'sort_criteria': 'Overall',
      'sort_order': 'desc',
      'per_page': 25,
      'page': 1,
      'currency': 'USD',
    };
    this.store.dispatch(hotelsActions.getHotels({ params }));
  }


  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      destination: ['', Validators.required],
      checkin: ['', Validators.required],
      checkout: ['', Validators.required],
      guests: [1, Validators.required],
    });
  }

  valueChange(event: any) {
    const checkinDate = moment(event[0]).format('YYYY-MM-DD');
    const checkoutDate = moment(event[1]).format('YYYY-MM-DD');

    this.searchForm.get('checkin')?.setValue(checkinDate);
    this.searchForm.get('checkout')?.setValue(checkoutDate);
  }

  increment() {
    if (this.searchForm.get('guests')?.value >= 4) {
      return;
    }
    this.searchForm.get('guests')?.setValue(this.searchForm.get('guests')?.value + 1);
  }

  decrement() {
    if (this.searchForm.get('guests')?.value <= 1) {
      return;
    }
    this.searchForm.get('guests')?.setValue(this.searchForm.get('guests')?.value - 1);
  }

  search() {
    const params: GetHotelsParams = {
      'guests': [this.searchForm.get('guests')?.value],
      'checkin': this.searchForm.get('checkin')?.value,
      'checkout': this.searchForm.get('checkout')?.value,
      'destination': this.searchForm.get('destination')?.value,
      'keyword': '',
      'rooms': 1,
      'sort_criteria': 'Overall',
      'sort_order': 'desc',
      'per_page': 25,
      'page': 1,
      'currency': 'USD',
    };
    this.store.dispatch(hotelsActions.getHotels({ params }));
  }

  openMap(template: TemplateRef<any>) {
    const config: ModalOptions = {
      class: 'modal-dialog-centered'
    };
    this.modalRef = this.modalService.show(template, config);
  }

  closeModal() {
    this.modalRef?.hide();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
