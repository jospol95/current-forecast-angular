import {createDefaultLoadable, Loadable} from './loadable';
import {NewWeatherActionUnion, WeatherActionTypes} from './weather.actions';
import {withLoadable} from './with-loadable';
import {CurrentForecast} from '../types/current-forecast.type';

export interface Weather extends Loadable {
    currentForecasts: CurrentForecast[];
}

export function createDefaultWeather(): Weather {
    return {
        ...createDefaultLoadable(),
        currentForecasts: []
    };
}

function baseWeatherReducer(state: Weather = createDefaultWeather(),
                            action: NewWeatherActionUnion): Weather {
    switch (action.type) {
        case WeatherActionTypes.LoadSuccess:
            return {
                ...state,
                currentForecasts: [...state.currentForecasts, {...action.payload.currentForecast, zipcode: action.payload.zipcode}],
            };
        default:
            return state;
    }
}


export function weatherReducer(state: Weather, action: NewWeatherActionUnion): Weather {
    return withLoadable(baseWeatherReducer, {
        // initLoadActionType: WeatherActionTypes.InitialLoad,
        loadingActionType: WeatherActionTypes.Load,
        successActionType: WeatherActionTypes.LoadSuccess,
        errorActionType: WeatherActionTypes.LoadError,
    })(state,action)
}
