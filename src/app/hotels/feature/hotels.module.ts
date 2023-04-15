import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AcceptButtonComponent } from 'src/app/shared/ui/accept-button/accept-button.component';
import { MapComponent } from 'src/app/shared/ui/map/map.component';
import { NavBarComponent } from 'src/app/shared/ui/nav-bar/nav-bar.component';
import { SharedInputComponent } from 'src/app/shared/ui/shared-input/shared-input.component';
import { HotelCardComponent } from '../ui/hotel-card/hotel-card.component';
import { HotelsListComponent } from '../ui/hotels-list/hotels-list.component';
import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelsComponent } from './hotels.component';


@NgModule({
  declarations: [
    HotelsComponent,
    HotelsListComponent,
    HotelCardComponent
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    NavBarComponent,
    BsDatepickerModule.forRoot(),
    SharedInputComponent,
    MapComponent,
    AcceptButtonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HotelsModule { }
