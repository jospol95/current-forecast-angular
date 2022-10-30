import {catchError, delay, map, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {LoadWeatherError, LoadWeatherSuccess, WeatherActionTypes} from './weather.actions';

function mockApiResponse(): Observable<{ currentForecast: string }> {
    return of({
        currentForecast: 'daily forecast'
    }).pipe(
        delay(1000)
    );
}

@Injectable()
export class WeatherEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    @Effect ()
    loadNews = this.actions$.pipe(
        ofType(WeatherActionTypes.Load),
        switchMap(action => {
            // return this.http.get('some url');
            return mockApiResponse().pipe(
                tap(() => console.log('called')),
                map((response: any) => new LoadWeatherSuccess({currentForecast: response.currentForecast})),
                catchError(error => of(new LoadWeatherError(error)))
            );
        }),
    );
}
