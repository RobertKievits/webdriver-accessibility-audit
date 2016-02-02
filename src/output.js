'use strict';

const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');


function Output (tests, testName, folder) {
	if (!(this instanceof Output)) {
    	return new Output(tests, testName, folder);
	}

	this._folder = folder;

	this.resolveElements(tests)
		.then((data) => {
			return this.formatJson(data, testName);
		})
		.then((data) => {
			jsonfile.writeFile(path.join(this._folder, testName + '.json'), data, {spaces: 4}, function(err) {
				if (err) throw err;
			});
		})
		.catch((e) => {
			console.log(e);
		});
}

Output.prototype.formatJson = function(tests, testName) {
	let resultObj = {};
	resultObj[testName] = {};
	let testObj = resultObj[testName];
	
	tests.forEach((test) => {
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

Output.prototype.getElements = (elements) => {
	if (!elements || !elements.length > 0) {
		return new Promise((resolve, reject) => {
			resolve([]);
		});
	}

	return Promise.all(elements.map((element) => {
		return element.getAttribute('class')
	}));
}

Output.prototype.resolveElements = function(tests) {
	return Promise.all(tests.map((test, i) => {
		return this.getElements(test.elements)
			.then((elements) => {
				test.elements = elements;
				return test;
			});
	}));
}

module.exports = Output;