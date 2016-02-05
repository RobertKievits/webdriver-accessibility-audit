'use strict';

var fs = require('fs');
var path = require('path');
var jsonfile = require('jsonfile');


function Output(tests, testName, folder) {
	if (!(this instanceof Output)) {
    	return new Output(tests, testName, folder);
	}

	this._folder = folder;

	this.resolveElements(tests)
		.then(function (data) {
			return this.formatJson(data, testName);
		}.bind(this))
		.then(function (data) {
			jsonfile.writeFile(path.join(this._folder, testName + '.json'), data, {spaces: 4}, function(err) {
				if (err) throw err;
			});
		}.bind(this))
		.catch(function (e) {
			console.log(e);
		}.bind(this));
}

Output.prototype.formatJson = function(tests, testName) {
	let resultObj = {};
	resultObj[testName] = {};
	let testObj = resultObj[testName];
	
	tests.forEach(function (test) {
		let result = test.result.toLowerCase();
		let severity = test.rule.severity.toLowerCase();
		if (!testObj[result]) {
			testObj[result] = {};
		}
		if (!testObj[result][severity]) {
			testObj[result][severity] = [];
		}

		testObj[result][severity].push(test);
	});

	return resultObj;
}

Output.prototype.getElements = function (elements) {
	if (!elements || !elements.length > 0) {
		return new Promise(function (resolve, reject) {
			resolve([]);
		});
	}

	return Promise.all(elements.map(function (element) {
		return element.getAttribute('class')
	}));
}

Output.prototype.resolveElements = function(tests) {
	return Promise.all(tests.map(function (test, i) {
		return this.getElements(test.elements)
			.then(function (elements) {
				test.elements = elements;
				return test;
			});
	}));
}

module.exports = Output;