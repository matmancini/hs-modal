(function () {
'use strict';

var path = require('path');

var mountFolder = function(connect, dir) {
    return connect.static(path.resolve(dir));
};

module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    hostname: '*',
                    port: 9001,
                    // keepalive: true
                    middleware: function (connect) {
                        return [
                            require('connect-livereload')(),
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/main.css': 'scss/main.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                map: true
            },
            dev: {
                src: 'css/main.css'
            }
        },
        watch: {
            sass: {
                options: {
                    livereload: true
                },
                files: ['scss/*.scss'],
                tasks: ['sass', 'autoprefixer']
            },
            jshint: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('server', function () {
        grunt.task.run([
            'jshint',
            'sass',
            'autoprefixer',
            'connect:server',
            'watch'
        ]);
    });

};

})();
