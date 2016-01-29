var fs = require('fs'),
	path = require('path'),
	mkdirp = require('mkdirp');

function A11yAudit(options, driver) {
	this.options = options;
}

A11yAudit.prototype.init = function(driver) {
	var flow = driver.controlFlow();
	var self = this;
	this._flow = flow;
	this._driver = driver;

	return this.browserCheck(driver)
		.then((data) => {
			if (data) {
				var axs = fs.readFileSync(path.join(__dirname, 'lib/axs_testing.js'), 'utf-8');
				return self._driver.executeScript(axs);
			}
		});
}

A11yAudit.prototype.browserCheck = function(driver) {
	return driver.getCapabilities()
		.then(function(data) {
			return data.caps_.browserName === 'chrome'
		});
}

A11yAudit.prototype.audit = function(driver) {
	var self = this;
	return this.browserCheck(driver)
		.then((data) => {
			if (data) {
				driver.executeScript('return axs.Audit.run()')
					.then(this.output.bind(this));
			}
		});
}


A11yAudit.prototype.output = function(data) {
	mkdirp(this.options.resultPath, (err) => {
	    if (err) console.error(err);
	    else {
	    	const resultFolder = path.join(process.cwd(), this.options.resultPath);
	    	fs.writeFile(path.join(resultFolder, 'audit.json'), data, (err) => {
			  if (err) throw err;
			  console.log('It\'s saved!');
			});
	    }
	});
	
}

module.exports = A11yAudit;