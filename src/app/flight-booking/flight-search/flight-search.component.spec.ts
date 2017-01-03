import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { FlightSearchComponent } from './flight-search.component';
import { FlightService } from '../services/flight.service';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flight } from '../../entities/flight';

let fixture: ComponentFixture<FlightSearchComponent>;
let flightServiceStub = {
    flights: [],
    find: () => {
    }
};
let activatedRouteStub = {
    queryParams: {
        subscribe: () => {
        }
    }
};

describe('FlightSearchComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlightSearchComponent],
            providers: [
                {provide: FlightService, useValue: flightServiceStub},
                {provide: ActivatedRoute, useValue: activatedRouteStub}
            ],
            imports: [FormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        })

        // Lädt css und html Dateien welche über styleUrls oder templateUrl angegeben werden
            .compileComponents();

        fixture = TestBed.createComponent(FlightSearchComponent);
    }));

    it('should show flights of FlightService', () => {
        let flightService: FlightService = TestBed.get(FlightService);

        let flightItem: Flight = {
            id: 1,
            from: 'Graz',
            to: 'Hamburg',
            date: new Date().toISOString()
        };
        flightService.flights = [flightItem, flightItem, flightItem];

        fixture.detectChanges();

        let flightCards = fixture.debugElement.queryAll(By.css('flight-card'));
        expect(flightCards.length).toBe(3);

    });


    it('should search if button is clicked', () => {
        let flightService: FlightService = fixture.debugElement.injector.get(FlightService);

        let searchForm: DebugElement = fixture.debugElement.query(By.css('form'));
        let button: DebugElement = searchForm.query(By.css('button'));

        let findSpy: jasmine.Spy = spyOn(flightService, 'find');
        spyOn(flightService, 'find');

        // Klick auf Button
        button.triggerEventHandler('click', null);
        expect(flightService.find).toHaveBeenCalled();

    });

});
