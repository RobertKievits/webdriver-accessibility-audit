'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const output = require('./src/output');

/**
 * Constructor for chainable WebDriver API
 * @param {WebDriver} driver WebDriver instance to analyze
 */
function A11yAudit(driver, options) {
	if (!(this instanceof A11yAudit)) {
		return new A11yAudit(driver, options);
	}

	this._driver = driver;
	this._options = options;

	options.resultPath = options.resultPath || '';
	this.createResultFolder(options.resultPath);
	this.createConfig(options);
}


/**
 * Creates folder where results will be placed
 * @param  {Function} callback Function
 */
A11yAudit.prototype.createResultFolder = function(folder) {
	fs.stat(folder, (err, stats) => {
		if (err && err.code === 'ENOENT') {
			mkdirp(folder, (err) => {
				if (err) console.error(err);
			});
		}
	});
}


/**
 * Creates config for axs run
 * @param  {Function} callback Function
 */
A11yAudit.prototype.createConfig = function(options) {
	this._config = {
		auditRulesToIgnore : options.auditRulesToIgnore
	};
}


/**
 * Runs accessibility audit
 * @param {String} String pass name of test to output  
 */
A11yAudit.prototype.audit = function(testName) {
	var flow = this._driver.controlFlow();
	var axs = fs.readFileSync(path.join(__dirname, 'libs/axs_testing.js'), 'utf-8');
	var script = '(function () {' +
		'if (typeof axs === "object" && axs.version) { return; }' +
		'var s = document.createElement("script");' +
		's.innerHTML = ' + JSON.stringify(axs) + ';' +
		'document.body.appendChild(s);' +
		'}());';
	
	
	function analyze() {
		return this._driver.getCapabilities()
			.then((data) => {
				if (data.caps_.browserName === 'chrome') {
					return this._driver
						.executeScript(script)
						.then(() => {
							return this._driver.executeScript(`return axs.Audit.run(new axs.AuditConfiguration(${JSON.stringify(this._config)}))`)
						})
						.then((tests) => {
							output(tests, testName, this._options.resultPath);
						});
				}
			});
	}
	

	return flow.execute(analyze.bind(this));
}


module.exports = A11yAudit;