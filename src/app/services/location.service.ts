import {Injectable} from '@angular/core';
import {WeatherService} from './weather.service';

export const LOCATIONS: string = 'locations';

@Injectable()
export class LocationService {
    //Used for local storage purposes.
    locations: string[] = [];

    constructor() {
        let locString = localStorage.getItem(LOCATIONS);
        if (locString) {
            this.locations = JSON.parse(locString);
        }
        // for (let loc of this.locations) {
        //     this.weatherService.addCurrentConditions(loc);
        // }
    }

    saveLocationInLocal(zipcode: string) {
        this.locations.push(zipcode);
        localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
        // this.weatherService.addCurrentConditions(zipcode);
    }

    removeLocationFromStorage(index: number) {
        this.locations.splice(index, 1);
        localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
        // this.weatherService.removeCurrentConditions(zipcode);
    }

}
