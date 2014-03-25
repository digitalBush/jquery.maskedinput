
module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n'+
                '    <%= pkg.description %>\n'+
                '    Copyright (c) 2007 - <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n'+
                '    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)\n'+
                '    Version: <%= pkg.version %>\n'+
                '*/\n\n',
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false
            },
            dist: {
                src: ['src/jquery.maskedinput.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
          dist: {
            files: {
              'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
            }
          }
        },
        jasmine: {
            full: {
                src: '<%= concat.dist.src %>',
                options: {
                    specs: 'spec/*[S|s]pec.js',
                    vendor: [
                        'lib/jquery-1.9.0.min.js',
                        'spec/lib/matchers.js',
                        'spec/lib/jasmine-species/jasmine-grammar.js',
                        'spec/lib/setup.js',
                        'spec/lib/jquery.keymasher.js'
                    ]
                }
            }
        },
        jshint: {
            files: ['gruntfile.js', '<%= concat.dist.src %>', '<%= jasmine.full.options.specs %>'],
            options: {
                jshintrc: 'src/.jshintrc'
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'jasmine']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('default', ['jshint', 'jasmine', 'concat', 'uglify']);
};
