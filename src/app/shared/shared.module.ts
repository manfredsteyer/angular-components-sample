import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CityPipe } from './pipes/city.pipe';
import { CityValidatorDirective } from './validation/city.validator';
import { RoundTripDirective } from './validation/roundtrip.validator';
import { AsyncCityValidatorDirective } from './validation/async-city.validator';
import { DateComponent } from './date/date.component';
import { AuthGuard } from './auth/auth.guard';
import { LeaveComponentGuard } from './deactivation/leave-component-guard';
import { CustomPreloadingStrategy } from './preload/custom-preloading.strategy';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { SimpleAuthService } from './auth/simple-auth.service';
import { AuthChildGuard } from './auth/auth.child.guard';
import { AuthLoadGuard } from './auth/auth.load.guard';
import { AuthService } from './auth/auth.service';
import { E2eLocatorDirective } from './e2e-locator/e2e-locator.directive';
import { AnimationDriver } from '@angular/platform-browser';
import { CustomAnimationDriverFactory } from './animation/custom-animation-driver';
import { TranslateModule } from 'ng2-translate';
import { FlightClickWithWarningDirective } from './warning/flight-click-with-warning.directive';
import { RepeateDirective } from './structural/repeate.directive';
import { UnlessDirective } from './structural/unless.directive';
import { TooltipDirective } from './structural/tooltip.directive';
import { TooltipComponent } from './structural/tooltip.component';
import { Tooltip2Directive } from './structural/tooltip2.directive';


@NgModule({
    imports: [
        FormsModule, // [(ngModel)]
        CommonModule // ngFor, ngIf, ngStyle, ngClass, date, json
    ],
    declarations: [
        CityPipe,
        CityValidatorDirective,
        AsyncCityValidatorDirective,
        RoundTripDirective,
        DateComponent,
        E2eLocatorDirective,
        FlightClickWithWarningDirective,
        RepeateDirective,
        UnlessDirective,
        TooltipDirective,
        TooltipComponent,
        Tooltip2Directive
    ],
    exports: [
        CityPipe,
        CityValidatorDirective,
        AsyncCityValidatorDirective,
        RoundTripDirective,
        DateComponent,
        E2eLocatorDirective,
        TranslateModule,
        FlightClickWithWarningDirective,
        RepeateDirective,
        UnlessDirective,
        TooltipDirective,
        TooltipComponent,
        Tooltip2Directive
    ],
    entryComponents: [
        TooltipComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            providers: [
                OAuthService,
                {provide: AuthService, useClass: SimpleAuthService},
                AuthGuard,
                AuthLoadGuard,
                AuthChildGuard,
                LeaveComponentGuard,
                CustomPreloadingStrategy,
                {provide: AnimationDriver, useFactory: CustomAnimationDriverFactory}
            ],
            ngModule: SharedModule
        };
    }
}
