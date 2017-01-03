// TypeScript Unterstüzung für Protractor
require('ts-node/register');

// Protractor Konfiguration
exports.config = {
    // Flag zum aktivieren der Protractor Unterstützung für Angular 2
    useAllAngular2AppRoots: true,

    onPrepare: function () {
        // Einstellung der Browser Auflösung
        browser.driver.manage().window().setSize(1280, 1024);
    },

    directConnect: true,

    // capabilities: {
    //     'browserName': 'chrome'
    // },

    // Alternative für mehrere Browser
    //multiCapabilities:[
    //  {
    //    'browserName' : 'safari'
    //  },
    //  {
    //    'browserName' : 'firefox'
    //  },
    //  {
    //    'browserName' : 'chrome'
    //  }
    //],

    specs: ['e2e/specs/*.e2e-spec.ts'],
    //   suites: {
    //    search: 'e2e/specs/flight-search.e2e-spec.ts',
    //    home: [
    //      'e2e/specs/flight-overview.e2e-spec.ts',
    //      'e2e/specs/check-page-title.e2e-spec.ts'
    //    ]
    //   },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
