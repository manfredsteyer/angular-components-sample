import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { LOCALE_ID, TRANSLATIONS_FORMAT, TRANSLATIONS } from '@angular/core';

let options: any = {
    providers: [
        {provide: TRANSLATIONS, useValue: require('./i18n/messages.de.xlf')},
        {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
        {provide: LOCALE_ID, useValue: 'de'}
    ]
};

platformBrowserDynamic().bootstrapModule(AppModule, options)
// .catch(err => console.error(err));
    .catch(function (err) {
        console.error(err);
    });
