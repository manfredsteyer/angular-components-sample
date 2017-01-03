// Vendors

// Angular 2
import '@angular/platform-browser-dynamic';
import '@angular/platform-browser';
import '@angular/core';
import '@angular/http';
import '@angular/router';


// RxJS 5
// import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

// For vendors for example jQuery, Lodash, angular2-jwt import them here
// Also see src/typings.d.ts as you also need to run `typings install x` where `x` is your module

// HammerJS Touch Gestures
import 'hammerjs/hammer';

// Bootstrap CSS
import 'file?name=/assets/css/[name].css!extract!bootstrap/dist/css/bootstrap.css';

// ng2-translate
import 'ng2-translate';

let jQuery = require('jquery');
window['$'] = window['jQuery'] = jQuery;
require('bootstrap');
