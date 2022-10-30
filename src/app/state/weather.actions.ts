import {Action} from '@ngrx/store';
import {CurrentForecast} from '../types/current-forecast.type';

export enum WeatherActionTypes {
    // InitialLoad = 'INIT LOAD',
    Load = 'LOAD',
    LoadSuccess = 'LOAD SUCCESS',
    LoadError = 'LOAD ERROR',
    Update = 'UPDATE',
    UpdateSuccess = 'UPDATE SUCCESS'
}

// export class InitWeather implements Action {
//     readonly type = WeatherActionTypes.InitialLoad;
//     constructor(public payload: {zipcode: string}) {
//     }
// }

export class UpdateSuccess implements Action {
    readonly type = WeatherActionTypes.UpdateSuccess;
    constructor(public payload: {currentForecast: CurrentForecast, zipcode: string, arrayPosition: number}) {}
}

export class UpdateWeather implements Action {
    readonly type = WeatherActionTypes.Update;
    constructor(public payload: {zipcode: string, arrayPosition: number}) {}
}

export class LoadWeather implements Action {
    readonly type = WeatherActionTypes.Load;
    constructor(public payload: {zipcode: string}) {
    }
}

export class LoadWeatherInitState implements Action {
    //new loadable with default.
    readonly type = WeatherActionTypes.LoadSuccess;
    constructor(public payload: {currentForecast: CurrentForecast, zipcode: string}) {}
}

export class LoadWeatherSuccess implements Action {
    readonly type = WeatherActionTypes.LoadSuccess;
    constructor(public payload: {currentForecast: CurrentForecast, zipcode: string}) {}
}

export class LoadWeatherError implements Action {
    readonly type = WeatherActionTypes.LoadError;
    constructor(public error: any) {}
}


export type NewWeatherActionUnion = UpdateWeather |  UpdateSuccess | LoadWeather | LoadWeatherSuccess | LoadWeatherError
