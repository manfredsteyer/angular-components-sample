import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import {
    ConnectionBackend, BaseRequestOptions, Http,
    Response, ResponseOptions, Request, Headers
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { BASE_URL } from '../../app.tokens';
import 'rxjs/add/operator/map';

import { Flight } from '../../entities/flight';
import { FlightService } from './flight.service';

let flightService: FlightService;
let request: Request;

let flight: Flight = {
    id: 12,
    date: new Date().toISOString(),
    from: 'Graz',
    to: 'Hamburg'
};

// Hilfsfunktion um ein Response Objekt zu erzeugen
let getFlightResponse = (jsonObject) => {
    return new Response(
        new ResponseOptions(
            {
                body: JSON.stringify(jsonObject)
            }
        )
    );
};

describe('FlightSearchComponent', () => {

    beforeEach(() => {
        let oAuthServiceStub = {
            getAccessToken: _ => {
                return 'ACCESS_TOKEN';
            }
        };

        TestBed.configureTestingModule({
            providers: [
                FlightService,
                MockBackend,
                BaseRequestOptions,
                {provide: OAuthService, useValue: oAuthServiceStub},
                {provide: BASE_URL, useValue: 'localhost'},
                {
                    provide: Http,
                    useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });
    });

    beforeEach(inject([MockBackend, FlightService], (mockBackend: MockBackend, _flightService: FlightService) => {

        flightService = _flightService;

        mockBackend.connections.subscribe((c: MockConnection) => {

            request = c.request;

            if (c.request.url.startsWith('/data/flights.json')) {

                c.mockRespond(getFlightResponse([flight, flight, flight]));

            } else if (c.request.url.startsWith('/data/flight.json')) {

                // Timeout zur Simulation längerer Response Zeit
                setTimeout(() => {
                    c.mockRespond(getFlightResponse(flight));
                }, 200);

            }
        });

    }));

    it('should find flights', async(() => {
        flightService.find('Graz', 'Hamburg');
        expect(flightService.flights).toEqual([flight, flight, flight]);
    }));

    it('should prepare the find http call correctly', async(() => {
        flightService.find('Graz', 'Hamburg');

        expect(request.url).toBe('/data/flights.json?from=Graz&to=Hamburg');

        let headers: Headers = request.headers;
        expect(headers.get('Authorization')).toBe('Bearer ACCESS_TOKEN');
    }));

    it('should find a flight by id with jasmine.done', (done) => {
        flightService.findById('12').subscribe(item => {
            expect(item).toEqual(flight);
            done();
        });
    });

    it('should find a flight by id with async', async(() => {
        flightService.findById('12').subscribe(item => {
            expect(item).toEqual(flight);
        });
    }));

    it('should find a flight by id with fakeAsync', fakeAsync(() => {
        let response;
        flightService.findById('12').subscribe(item => response = item);

        tick(100);
        expect(response).toBeUndefined();

        tick(100);
        expect(response).toEqual(flight);
    }));

});
