import {Action} from '@ngrx/store';

export enum WeatherActionTypes {
    Load = 'LOAD',
    LoadSuccess = 'LOAD SUCCESS',
    LoadError = 'LOAD ERROR',
}

export class LoadWeather implements Action {
    readonly type = WeatherActionTypes.Load;
}

export class LoadWeatherSuccess implements Action {
    readonly type = WeatherActionTypes.LoadSuccess;
    constructor(public payload: {currentForecast: string}) {}
}

export class LoadWeatherError implements Action {
    readonly type = WeatherActionTypes.LoadError;
    constructor(public error: any) {}
}


export type NewWeatherActionUnion = LoadWeather | LoadWeatherSuccess | LoadWeatherError
