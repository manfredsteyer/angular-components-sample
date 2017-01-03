import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BASE_URL } from './app.tokens';
import { SharedModule } from './shared/shared.module';
import { AppRouterModule } from './app.routes';
import { HomeComponent } from './home/home.component';
import { FlightHistoryComponent } from './flight-history/flight-history.component';
import { BookingsComponent } from './bookings/bookings.component';
import { InvoicesModule } from './invoices/invoices.module';
import { BookingDetailsComponent } from './bookings/booking-details.component';
import { TranslateModule, TranslateLoader } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';

export class IntegrationLoader implements TranslateLoader {
    getTranslation(langId: string): Observable<any> {
        let langs = {};
        langs['de'] = require('../i18n/de.json');
        langs['en'] = require('../i18n/en.json');
        return Observable.of(JSON.parse(langs[langId]));
    }
}

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule.forRoot(),
        AppRouterModule,
        InvoicesModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useClass: IntegrationLoader
        })
        // FlightBookingModule // <-- Würde Lazy Loading verhindern
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        BookingsComponent,
        BookingDetailsComponent,
        FlightHistoryComponent
    ],
    providers: [
        {provide: BASE_URL, useValue: 'http://www.angular.at'}
    ],
    bootstrap: [
        AppComponent

    ]
})
export class AppModule {
}
