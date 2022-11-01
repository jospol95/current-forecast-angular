import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ZipcodeEntryComponent} from './zipcode-entry/zipcode-entry.component';
import {LocationService} from './services/location.service';
import {ForecastsListComponent} from './forecasts-list/forecasts-list.component';
import {WeatherService} from './services/weather.service';
import {CurrentConditionsComponent} from './current-conditions/current-conditions.component';
import {MainPageComponent} from './main-page/main-page.component';
import {RouterModule} from '@angular/router';
import {routing} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {StateButtonComponent} from './state-button/state-button.component';
import {StoreModule} from '@ngrx/store';
import {weatherReducer} from './state/weather';
import {EffectsModule} from '@ngrx/effects';
import {WeatherEffects} from './state/weather.effects';
import {CurrentConditionsItemComponent} from './current-conditions/current-conditions-item/current-conditions-item.component';
import {AutoCompleteComponent} from './auto-complete/auto-complete.component';

@NgModule({
    declarations: [
        AppComponent,
        ZipcodeEntryComponent,
        ForecastsListComponent,
        CurrentConditionsComponent,
        MainPageComponent,
        StateButtonComponent,
        CurrentConditionsItemComponent,
        AutoCompleteComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        routing,
        StoreModule.forRoot({weather: weatherReducer}),
        EffectsModule.forRoot([WeatherEffects]),
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
    ],
    providers: [LocationService, WeatherService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
