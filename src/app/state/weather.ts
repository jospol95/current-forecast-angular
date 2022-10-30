import {createDefaultLoadable, Loadable} from './loadable';
import {NewWeatherActionUnion, WeatherActionTypes} from './weather.actions';
import {withLoadable} from './with-loadable';

export interface Weather extends Loadable {
    currentForecasts: string[];
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
            // var object = {
            //     ...state,
            //     entities: [...state.currentForecasts, action.payload.currentForecast] ,
            // };
            // console.log(object);
            return {
                ...state,
                currentForecasts: [...state.currentForecasts, action.payload.currentForecast],
            };
        default:
            return state;
    }
}


export function weatherReducer(state: Weather, action: NewWeatherActionUnion): Weather {
    return withLoadable(baseWeatherReducer, {
        loadingActionType: WeatherActionTypes.Load,
        successActionType: WeatherActionTypes.LoadSuccess,
        errorActionType: WeatherActionTypes.LoadError,
    })(state,action)
}
