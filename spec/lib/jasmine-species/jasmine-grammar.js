/**
 * Jasmine Grammar - Additional Jasmine grammar to enable alternate BDD approaches.
 * 
 * Copyright (C) 2010-2011, Rudy Lattae
 * License: Simplified BSD
 * 
 * Jasmine-Grammar contains some additions to the jasmine api that  make it 
 * more suitable to alternate BDD approaches. The end-goal is streamline the 
 * grammatical aspect of specing out an application from different view-points.
 * 
 * The new grammar should make it easier to create other types of specifications 
 * apart from "describe" and "it should". They are simply wrappers 
 * for "describe" and "it" so they follow the same rules for nesting. 
 */

// Top level namespace for the package
jasmine.grammar = (typeof jasmine.grammar === 'undefined') ? {} : jasmine.grammar;


/**
 * Feature / Story => Scenario => ... style grammar
 */
jasmine.grammar.FeatureStory = {
    
    /**
     * Defines a suite tagged as a "feature"
     */
    feature: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe('Feature: ' + description, specDefinitions);
        suite.tags = ['feature'];
        return suite;
    },
    
    /**
     * Defines a suite tagged as a "story"
     */
    story: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe('Story: ' + description, specDefinitions);
        suite.tags = ['story'];
        return suite;
    },
    
    /**
     * Defines a suite tagged as a "component"
     */
    component: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe('Component: ' + description, specDefinitions);
        suite.tags = ['component'];
        return suite;
    },
    
    /**
     * Defines a spec marked as a "scenario"
     */
    scenario: function(desc, func) {
        return jasmine.grammar.getEnv().it('Scenario: ' + desc, func);
    }
};


/**
 * Given => When => Then ... style grammar
 */
jasmine.grammar.GWT = {
    
    /**
     * Defines a "given" step as a runs block that marks the beginning of a GWT chain
     */
    given: function(desc, func) {
        return this._addStepToCurrentSpec('Given ' + desc, func);
    },
    
    /**
     * Defines a "when" step as a runs block that marks the interesting event in a GWT chain
     */
    when: function(desc, func) {
        return this._addStepToCurrentSpec('When ' + desc, func);
    },
    
    /**
     * Defines a "then" step as a runs block that marks the conclusion of a Given, when, then construct
     */
    then: function(desc, func) {
        return this._addStepToCurrentSpec('Then ' + desc, func);
    },
    
    /**
     * Defines an "and" step as a runs block that is a continuation from a "then" statement
     */
    and: function(desc, func) {
        return this._addStepToCurrentSpec('And ' + desc, func);
    },
    
    /**
     * Defines a "but" step as a runs block that is a continuation from a "then" statement
     */
    but: function(desc, func) {
        return this._addStepToCurrentSpec('But ' + desc, func);
    },    
        
    /**
     * Adds the given function as a step (runs block) in the current spec. Also adds the description to the details list of the spec
     */
    _addStepToCurrentSpec: function(desc, func) {
        var spec = jasmine.grammar.getEnv().currentSpec;
        spec.details = spec.details || [];
        spec.details.push(desc);
        spec.runs(func);
        return spec;
    }
};



/**
 * Concern => Context => Specification style grammar
 */
jasmine.grammar.ContextSpecification = {
    
    /**
     * Defines a suite tagged as a "concern"
     */
    concern: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe(description, specDefinitions);
        suite.tags = ['concern'];
        return suite;
    },
    
    /**
     * Defines a suite tagged as a "context"
     */
    context: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe(description, specDefinitions);
        suite.tags = ['context'];
        return suite;
    },
    
    /**
     * Defines a simple spec -- similar to it
     */
    spec: function(desc, func) {
        return jasmine.grammar.getEnv().it(desc, func);
    }
}

/**
 * Executable docs (Topic => Example) style grammar
 */
jasmine.grammar.XDoc = {
    
    /**
     * Defines a suite tagged as a "topic"
     */
    topic: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe(description, specDefinitions);
        suite.tags = ['topic'];
        return suite;
    },
    
    /**
     * Defines a suite tagged as an "example".
     *
     * An axample suite actually stores the inner suites as a string in the "defs" attribute 
     */
    example: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe(description, specDefinitions);
        suite.tags = ['example'];
        suite.expose = true;
        suite.defs = specDefinitions.toString()
            .replace(/^function.*\(.*\).*{/, '')
            .replace(/}$/, '').trim(); // stored for later output 
        return suite;
    },
    
    /**
     * Defines a simple spec without any associated function
     */
    pass: function(desc, func) {
        return jasmine.grammar.getEnv().it(desc);
    }
};


/**
 * Some more useful constructs that attach metadata to suites and specs
 */
jasmine.grammar.Meta = {
    
    /**
     * Adds summary content to the current suite.
     *
     * @param {String} content(s)     variable number of detail content
     * @see jasmine.grammar.SuiteDetails
     */
    summary: function() {
        var suite = jasmine.grammar.getEnv().currentSuite;
        suite.summary = suite.summary || [];
        
        if (arguments.length > 0) {
            for(i=0; i<arguments.length; i++) {
                suite.summary.push(arguments[i]);
            }
        }
    },
    
    /**
     * Adds detail entries in the current spec.
     *
     * @param {String} content(s)     variable number of detail content
     * @see jasmine.grammar.SuiteDetails
     */
    details: function() {
        var spec = jasmine.grammar.getEnv().currentSpec;
        spec.details = spec.details || [];
        
        if (arguments.length > 0) {
            for(i=0; i<arguments.length; i++) {
                spec.details.push(arguments[i]);
            }
        }
    }
};


// Utilities
// =========

/**
 * Getter for the Jasmine environment. Makes it possible to inject a different environment when necessary.
 */
jasmine.grammar.getEnv = function() {
    return jasmine.grammar._currentEnv = jasmine.grammar._currentEnv || jasmine.getEnv();
};