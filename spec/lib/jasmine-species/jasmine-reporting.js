/**
 * Jasmine Reporting - Companion reporting with metadata output for your 
 * Jasmine specs with extended grammar
 * 
 * Copyright (C) 2010-2011, Rudy Lattae
 * License: Simplified BSD
 */
 
// Top level namespace for the package
jasmine.reporting = (typeof jasmine.reporting === 'undefined') ? {} : jasmine.reporting;


/**
 * The StyledHtmlReporter provides augments the jasmine.TrivialReporter
 *
 * It outputs additional meta-data relating to your specs to streamline 
 * the presentation of the spec report. When used in conjunction with the 
 * the alternate BDD grammar, your Html report is much easier on the eyes.
 */
jasmine.reporting.StyledHtmlReporter = function(doc) {
    this.document = doc || document;
    this.suiteDivs = {};
    this.logRunningSpecs = false;
};

jasmine.reporting.StyledHtmlReporter.prototype = new jasmine.TrivialReporter();
jasmine.reporting.StyledHtmlReporter.prototype.constructor = jasmine.reporting.StyledHtmlReporter;


jasmine.reporting.StyledHtmlReporter.prototype.reportRunnerStarting = function(runner) {
  var showPassed, showSkipped;

  this.outerDiv = this.createDom('div', { className: 'jasmine_reporter' },
      this.createDom('div', { className: 'banner' },
        this.createDom('div', { className: 'logo' },
            this.createDom('a', { href: 'http://pivotal.github.com/jasmine/', target: "_blank" }, "Jasmine"),
            this.createDom('span', { className: 'version' }, runner.env.versionString())),
        this.createDom('div', { className: 'options' },
            "Show ",
            showPassed = this.createDom('input', { id: "__jasmine_TrivialReporter_showPassed__", type: 'checkbox' }),
            this.createDom('label', { "for": "__jasmine_TrivialReporter_showPassed__" }, " passed "),
            showSkipped = this.createDom('input', { id: "__jasmine_TrivialReporter_showSkipped__", type: 'checkbox' }),
            this.createDom('label', { "for": "__jasmine_TrivialReporter_showSkipped__" }, " skipped")
            )
          ),

      this.runnerDiv = this.createDom('div', { className: 'runner running' },
          this.createDom('a', { className: 'run_spec', href: '?' }, "run all"),
          this.runnerMessageSpan = this.createDom('span', {}, "Running..."),
          this.finishedAtSpan = this.createDom('span', { className: 'finished-at' }, ""))
      );

  this.document.body.appendChild(this.outerDiv);

  var suites = runner.suites();
  for (var i = 0; i < suites.length; i++) {
    var suite = suites[i];

    var suiteTags = (typeof suite.tags === 'undefined') ? '' : ' ' + suite.tags.join(' ');
    var suiteDiv = this.createDom('div', { className: 'suite' + suiteTags },
        this.createDom('a', { className: 'run_spec', href: '?spec=' + encodeURIComponent(suite.getFullName()) }, "run"),
        this.createDom('a', { className: 'description', href: '?spec=' + encodeURIComponent(suite.getFullName()) }, suite.description));
        
    if (suite.summary) {
      suiteDiv.appendChild(this.createDom('div', {className: 'summary'}, this.createDomFromListOrString(suite.summary)));
    }
    
    if (suite.expose) {
      suiteDiv.appendChild(this.createDom('pre', {}, suite.defs));
    }
    
    this.suiteDivs[suite.id] = suiteDiv;
    var parentDiv = this.outerDiv;
    if (suite.parentSuite) {
      parentDiv = this.suiteDivs[suite.parentSuite.id];
    }
    parentDiv.appendChild(suiteDiv);
  }

  this.startedAt = new Date();

  var self = this;
  showPassed.onchange = function(evt) {
    if (evt.target.checked) {
      self.outerDiv.className += ' show-passed';
    } else {
      self.outerDiv.className = self.outerDiv.className.replace(/ show-passed/, '');
    }
  };

  showSkipped.onchange = function(evt) {
    if (evt.target.checked) {
      self.outerDiv.className += ' show-skipped';
    } else {
      self.outerDiv.className = self.outerDiv.className.replace(/ show-skipped/, '');
    }
  };
};

jasmine.reporting.StyledHtmlReporter.prototype.reportSuiteResults = function(suite) {
  var results = suite.results();
  var status = results.passed() ? 'passed' : 'failed';
  if (results.totalCount == 0 && (!status == 'failed' || !suite.isIntermediate)) { // todo: change this to check results.skipped
    status = 'skipped';
  }
  this.suiteDivs[suite.id].className += " " + status;
};

jasmine.reporting.StyledHtmlReporter.prototype.reportSpecResults = function(spec) {
  var results = spec.results();
  var status = results.passed() ? 'passed' : 'failed';
  if (results.skipped) {
    status = 'skipped';
  }
  var specDiv = this.createDom('div', { className: 'spec '  + status },
      this.createDom('a', { className: 'run_spec', href: '?spec=' + encodeURIComponent(spec.getFullName()) }, "run"),
      this.createDom('a', {
        className: 'description',
        href: '?spec=' + encodeURIComponent(spec.getFullName()),
        title: spec.getFullName()
      }, spec.description));

  if (spec.details) {
    specDiv.appendChild(this.createDom('div', {className: 'details'}, this.createDomFromListOrString(spec.details)));
  }
  
  var resultItems = results.getItems();
  var messagesDiv = this.createDom('div', { className: 'messages' });
  for (var i = 0; i < resultItems.length; i++) {
    var result = resultItems[i];

    if (result.type == 'log') {
      messagesDiv.appendChild(this.createDom('div', {className: 'resultMessage log'}, result.toString()));
    } else if (result.type == 'expect' && result.passed && !result.passed()) {
      messagesDiv.appendChild(this.createDom('div', {className: 'resultMessage fail'}, result.message));

      if (result.trace.stack) {
        messagesDiv.appendChild(this.createDom('div', {className: 'stackTrace'}, result.trace.stack));
      }
    }
  }

  if (messagesDiv.childNodes.length > 0) {
    specDiv.appendChild(messagesDiv);
  }

  this.suiteDivs[spec.suite.id].appendChild(specDiv);
};

/**
 * Creates the proper dom element for the given data object.
 *
 * If the data is a simple string, the element created is a "p".
 * If the data is a list, the element created is an unordered list.
 * The tags are rendered to the class attribute on the dom element created  
 */
jasmine.reporting.StyledHtmlReporter.prototype.createDomFromListOrString = function(data, tags) {
    var classAttrs = '';
    if (typeof tags !== 'undefined') {
        classAttrs = (tags instanceof Array) ? tags.join(' ') : tags; 
    }
    if (data instanceof Array) {
        return this.createDomList('ul', ((classAttrs == '') ? {} : { className: classAttrs}), data);
    }
    
    return this.createDom('p', { className: classAttrs}, data);
}

/**
 * Creates dom element with the suite defs as content 
 */
jasmine.reporting.StyledHtmlReporter.prototype.createDomFromSuiteDefs = function(defs) {
    var classAttrs = '';
    if (typeof defs !== 'undefined') {
        return this.createDom('p', {}, defs);
    }
}

/**
 * Creates a list of 'li' elements given an array
 */
jasmine.reporting.StyledHtmlReporter.prototype.createDomList = function(type, attrs, items) {
    var list;
    if (typeof items !== 'undefined' && items.length > 0) {
        list = this.createDom(type, attrs);
        for (var i = 0; i < items.length; i++) {
            list.appendChild(this.createDom('li', {}, items[i]));
        }
    }
    return list;
};