import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {LocationService} from '../location.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Weather} from '../state/weather';
import {LoadWeather} from '../state/weather.actions';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit{

    locationForecast$: Observable<Weather>;

    constructor(private weatherService: WeatherService,
                private locationService: LocationService,
                private router: Router,
                private store: Store<{ weather: Weather }>) {
        this.locationForecast$ = this.store.select(state => state.weather);

    }

    ngOnInit(): void {
        this.initState();
    }

    initState(){
        //TODO could be a resolver
        this.locationService.locations.forEach((zipcode) => {
            // debugger;
            const action = new LoadWeather({zipcode});
            this.store.dispatch(action);
        });
    }

    getCurrentConditions() {
        return this.weatherService.getCurrentConditions();
    }

    showForecast(zipcode: string) {
        this.router.navigate(['/forecast', zipcode])
    }

    getCurrentCondition(zipcode: string) {
        const action = new LoadWeather({zipcode});
        this.store.dispatch(action);
    }

    removeFromState() {

    }

}
