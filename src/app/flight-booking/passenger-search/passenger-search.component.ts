import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';

@Component({
    templateUrl: './passenger-search.component.html'
})
export class PassengerSearchComponent implements OnInit, OnDestroy {
    blackList: Array<any>;

    timeSubscribtion: Subscription;
    timeObservable: Observable<any>;

    inputSubject: BehaviorSubject<any>;
    listObservable: Observable<any>;
    loading: Boolean = true;


    constructor(private http: Http) {

        // Dem Observable wird ein Array mit dem Operator .from bereitgestellt
        Observable.from(['Max', 'Fritz', 'Peter'])
        // Mit dem Operator .map wird der Wert verändert
            .map(person => person.toUpperCase())
            .subscribe({
                // Jeder Array Wert wird nach Durchlauf der Sequenz der Callback-Funktion next übergeben
                next: (person) => {
                    console.log('Person in Großbuchstaben: ' + person);
                },
                // Wenn alle Personen durchlaufen sind ist der Stream beendet und complete wird aufgerufen
                complete: () => {
                    console.log('Alle Personen durchlaufen');
                }
            });

    }

    ngOnInit() {

        // Teil 1
        let observer = {
            next: resp => this.blackList = resp,
            error: err => console.error('Observer erhält einen Fehler: ' + err),
            complete: () => console.log('Abarbeitung der Flugverbotsliste ist abgeschlossen'),
        };

        Observable.create(observer => {
            observer.next('Max');
            observer.next('Fritz');
            setTimeout(() => {
                observer.next('Peter');
                observer.complete();
            }, 1000);
        })
            .do(res => console.log(new Date().getSeconds(), res))
            .map((resp, index) => {
                return {
                    id: index,
                    name: resp
                };
            })
            .toArray()
            .subscribe(observer);
        // ----


        // Teil 2
        this.timeObservable = Observable.interval(1000)
            .startWith(0)
            .map(resp => new Date())
            .do(resp => console.log('Observable mit interval: ' + resp.getMilliseconds()));

        this.timeSubscribtion = this.timeObservable.subscribe(resp => {
            console.log('Observer erhält einen Datum: ' + resp.getMilliseconds(), '\n--');
        });
        // ----


        // Teil 3
        let passengersHttp = (searchTerm) => {
            return this.http.get('/wrong/passengers.json?name=' + searchTerm)
                .catch(err => this.http.get('/data/passengers.json?name=' + searchTerm))
                // Simulation Backend
                .delay(2000)
                .map(resp => {
                    return resp.json().filter(passenger => {
                        let search = passenger.name.toLowerCase() + passenger.lastName.toLowerCase();
                        return search.indexOf(searchTerm.toLowerCase()) !== -1;
                    });
                });
            // ---
        };

        passengersHttp('dan').subscribe(resp => console.log(resp));

        this.inputSubject = new BehaviorSubject({target: {value: ''}});
        this.listObservable = this.inputSubject
            .asObservable()
            .debounceTime(300)
            .map(event => event.target.value)
            .distinctUntilChanged()
            .do(() => this.loading = true)
            .switchMap(searchTerm => passengersHttp(searchTerm))
            .do(() => this.loading = false);
        // ----

    }

    ngOnDestroy() {
        // Teil 2
        this.timeSubscribtion.unsubscribe();
    }

}
