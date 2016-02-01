'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const jsonfile = require('jsonfile');

let resultFolder;

function A11yAudit(options, driver) {
	this.options = options;
	this._driver = driver;
}

A11yAudit.prototype.browserCheck = function() {
	return this._driver.getCapabilities()
		.then(function(data) {
			return data.caps_.browserName === 'chrome'
		});
}

A11yAudit.prototype.init = function() {
	this._flow = this._driver.controlFlow();

	return this.browserCheck()
		.then((isChrome) => {
			if (isChrome) {
				let axs = fs.readFileSync(path.join(__dirname, 'lib/axs_testing.js'), 'utf-8');
				resultFolder = path.join(process.cwd(), this.options.resultPath);
				this.createFolder(resultFolder);
				return this._driver.executeScript(axs);
			}
		});
}

A11yAudit.prototype.audit = function(testName) {
	return this.browserCheck()
		.then((isChrome) => {
			if (isChrome) {
				this._driver.executeScript('return axs.Audit.run()')
					.then((data) => {
						this.output(data, testName);
					});
			}
		});
}

A11yAudit.prototype.createFolder = function(folder) {
	fs.stat(folder, (err, stats) => {
		if (err && err.code === 'ENOENT') {
			mkdirp(folder, (err) => {
				if (err) console.error(err);
			});
		}
	});
}

A11yAudit.prototype.resolveElements = function(tests) {
	var promises = tests.map((test, i) => {
		return this.getElements(test.elements)
			.then((elements) => {
				test.elements = elements;
				return test;
			});
	});

	return Promise.all(promises)
}

A11yAudit.prototype.formatJson = function(tests, testName) {
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

A11yAudit.prototype.output = function(tests, testName) {
	this.resolveElements(tests)
		.then((data) => {
			return this.formatJson(data, testName);
		})
		.then((data) => {
			jsonfile.writeFile(path.join(resultFolder, testName + '.json'), data, {spaces: 4}, function(err) {
				if (err) throw err;
			});
		})
		.catch((e) => {
			console.log(e);
		});
}

A11yAudit.prototype.getElements = (elements) => {
	if (!elements || !elements.length > 0) {
		return new Promise((resolve, reject) => {
			resolve([]);
		});
	}

	var els = elements.map((element) => {
		return element.getAttribute('class')
	});

	return Promise.all(els);
}

module.exports = A11yAudit;