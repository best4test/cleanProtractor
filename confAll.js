exports.config = {
  directConnect: false,
  allScriptsTimeout: 999996,
  framework: "jasmine2",
  multiCapabilities: [
  { 'browserName': 'chrome',
    'chromeOptions': {
      args: ['--test-type', 'incognito=true', 'start-maximized']
    }
  }
  ],

    specs: [
    './specs/login_spec.js',   
    './specs/testcases_spec.js'    
     ],

// Options to be passed to Jasmine-node.
jasmineNodeOpts: {
  showColors: true,
  defaultTimeoutInterval: 199993
},
onPrepare: function() {
  var webRep = require('jasmine-web-reporter');
  browser.getProcessedConfig().then(function(config) {
      var browserName = config.capabilities.browserName;
      jasmine.getEnv().addReporter(new webRep.WebReporter({
        projectName:'All',
        module:'AutoUpdateProduction',
        url: 'http://demo.qaconsole.com/testruns',
        environment : 'Production',
        info : {
          "browserName" : config.capabilities.browserName
        }
      }));
  });

  require('./libs/core.js');

}
};
