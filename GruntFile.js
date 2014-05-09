module.exports = function(grunt) {

    //Task configuration
    grunt.initConfig({
        concat: {
            dist: {
                src: [  'src/js/vendor/**/*.js',
                        'src/js/app.js',
                        'src/js/controllers/**/*.js',
                        'src/js/directives/**/*.js',
                        'src/js/filters/**/*.js',
                        'src/js/services/**/*.js'
                ],
                dest: 'extension/js/script.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'extension/css/style.css': 'src/sass/style.scss'
                }
            }
        },
        watch: {
            concat: {
                files: [    'src/js/vendor/**/*.js',
                            'src/js/app.js',
                            'src/js/controllers/**/*.js',
                            'src/js/directives/**/*.js',
                            'src/js/filters/**/*.js',
                            'src/js/services/**/*.js'
                ],
                tasks: ['concat']
            },
            sass: {
                files: ['src/sass/style.scss'],
                tasks: ['sass']
            }
        }
    });

    //Load the plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Default task: (re-)compile everything (watch must be called manually)
    grunt.registerTask('default', ['concat', 'sass']);
};