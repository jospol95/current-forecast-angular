import {catchError, concatMap, delay, map, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {LoadWeather, LoadWeatherError, LoadWeatherSuccess, UpdateSuccess, UpdateWeather, WeatherActionTypes} from './weather.actions';
import {WeatherService} from '../weather.service';
import {CurrentForecast} from '../types/current-forecast.type';

function mockApiResponse(): Observable<{ currentForecast: string }> {
    return of({
        currentForecast: 'daily forecast'
    }).pipe(
        delay(1000)
    );
}

@Injectable()
export class WeatherEffects {

    constructor(private actions$: Actions, private weatherService: WeatherService) {
    }

    @Effect ()
    loadCurrentForecast = this.actions$.pipe(
        ofType<LoadWeather>(WeatherActionTypes.Load),
        concatMap((action) => {
            return this.weatherService.getCurrentForecast(action.payload.zipcode).pipe(
                tap(() => console.log(action.payload.zipcode)),
                map((response: CurrentForecast) => new LoadWeatherSuccess(
                    {currentForecast: response, zipcode: action.payload.zipcode})),
                catchError(error => of(new LoadWeatherError(error)))
            );
        }),
    );

    @Effect()
    updateCurrentForecast = this.actions$.pipe(
        ofType<UpdateWeather>(WeatherActionTypes.Update),
        concatMap((action) => {
            return this.weatherService.getCurrentForecast(action.payload.zipcode).pipe(
                tap(() => console.log(action.payload.zipcode)),
                map((response: CurrentForecast) => new UpdateSuccess(
                    {currentForecast: response, zipcode: action.payload.zipcode, arrayPosition: action.payload.arrayPosition})),
                catchError(error => of(new LoadWeatherError(error)))
            );
        }),
    );

    // @Effect ()
    // initialLoadCurrentForecast = this.actions$.pipe(
    //     ofType<InitWeather>(WeatherActionTypes.InitialLoad),
    //     concatMap((action) => {
    //         return this.weatherService.getCurrentForecast(action.payload.zipcode).pipe(
    //             tap(() => console.log(action.payload.zipcode)),
    //             map((response: CurrentForecast) => new LoadWeatherSuccess(
    //                 {currentForecast: response, zipcode: action.payload.zipcode})),
    //             catchError(error => of(new LoadWeatherError(error)))
    //         );
    //     }),
    // );
}
