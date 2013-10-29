
"use strict";

module.exports = function( grunt ) {
  grunt.initConfig({
    jasmine: {
      full: {
        src: "src/**/*.js",
        options: {
          specs: "spec/*Spec.js",
          vendor: [
            "spec/lib/matchers.js",
            "spec/lib/jasmine-species/jasmine-grammar.js",
            "spec/lib/setup.js",
            "lib/jquery-1.9.0.min.js",
            "spec/lib/jquery.keymasher.js"
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jasmine");

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', ['test']);
};
