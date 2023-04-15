import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { HotelsService } from 'src/app/hotels/data-access/hotels.service';
import * as hotelActions from '../actions/hotels.actions';


@Injectable()
export class HotelsEffects {

    constructor(
        private actions$: Actions,
        private hotelsService: HotelsService,
    ) { }

    getHotels$ = createEffect(() =>
        this.actions$.pipe(
            ofType(hotelActions.getHotels),
            exhaustMap(action => this.hotelsService.getHotels(action.params).pipe(
                map(response => hotelActions.getHotelsSuccess(response)),
                catchError((error: any) => of(hotelActions.getHotelsFailure(error)))))
        ));
}
