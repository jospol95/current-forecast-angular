import {Injectable} from '@angular/core';
import {WeatherService} from './weather.service';
import {CurrentConditionsType} from '../types/current-conditions.type';

export const LOCATIONS: string = 'locations';

@Injectable()
export class LocationService {
    //Used for local storage purposes.
    // locations: string[] = [];
    locationsV2: CurrentConditionsType[] = [];

    constructor() {
        let locString = localStorage.getItem(LOCATIONS);
        // if (locString) {
        //     this.locations = JSON.parse(locString);
        // }
        if (locString) {
            this.locationsV2 = JSON.parse(locString);
        }
    }

    saveLocationInLocal(zipcode: string, country: string) {
        this.locationsV2.push({zipcode, country});
        localStorage.setItem(LOCATIONS, JSON.stringify(this.locationsV2));
    }

    removeLocationFromStorage(index: number) {
        this.locationsV2.splice(index, 1);
        localStorage.setItem(LOCATIONS, JSON.stringify(this.locationsV2));
    }

    // saveLocationInLocal(zipcode: string) {
    //     this.locations.push(zipcode);
    //     localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    // }
    //
    // removeLocationFromStorage(index: number) {
    //     this.locations.splice(index, 1);
    //     localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    // }

}
