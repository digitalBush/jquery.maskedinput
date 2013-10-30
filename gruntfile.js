
"use strict";

module.exports = function( grunt ) {
  grunt.initConfig({
    // TODO: change to read component.json
    pkg: require('./package.json'),

    uglify: {
      options: {
        banner: '/*\n    <%= pkg.description %>\n    Copyright (c) 2007 - <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)\n    Version: <%= pkg.version %>\n*/\n'
      },

      dev: {
        options: {
          beautify: true
        },

        files: {
          'dist/jquery.maskedinput.js': ['src/jquery.maskedinput.js']
        }
      },

      min: {
        files: {
          'dist/jquery.maskedinput.min.js': ['src/jquery.maskedinput.js']
        }
      }
    },

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
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', ['test', 'uglify']);
};
