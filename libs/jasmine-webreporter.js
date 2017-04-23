exports.WebReporter = function(options) {
	var self = this;
	var testPassed = 0;
	var testTotal = 0;

	self.url = options.url;
	self.projectName = options.projectName;
	self.environment = options.environment;
	self.info = options.info;

	var testRun =
		{
			projectName : self.projectName,
			environment : self.environment,
			info : self.info,
			status : "passed",
			tests : []
		};

	self.specDone = function(spec) {
		spec._endTime = new Date();
		testRun.tests.push(spec);
		testTotal++;
		if (spec.status === 'failed'){
			testRun.status = "failed";
		}
		if (spec.status === 'passed'){
			testPassed++;
		}
	};

	self.jasmineDone = function() {
		testRun.endTime = new Date();
		var request = require('request');
		request.post(self.url, {json: true, body: testRun}, function(err,res,body){
		});
	};
};
