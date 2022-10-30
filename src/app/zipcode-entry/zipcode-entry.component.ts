import {Component, EventEmitter, Output} from '@angular/core';
import {LocationService} from "../location.service";
import {Observable} from 'rxjs';
import {Weather} from '../state/weather';
import {Store} from '@ngrx/store';
import {LoadWeather} from '../state/weather.actions';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {
  locationForecast$: Observable<Weather>;
  // @Output() locationAddedEvent = new EventEmitter<string>();
  constructor(private service : LocationService, private store: Store<{weather: Weather}>) {
    this.locationForecast$ = this.store.select(state => state.weather);
  }

  addLocation(zipcode : string){
    this.service.addLocation(zipcode);
    const action = new LoadWeather({zipcode});
    this.store.dispatch(action);
  }

}
