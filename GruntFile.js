module.exports = function(grunt) {

    //Task configuration
    grunt.initConfig({
        concat: {
            dist: {
                src: [  'src/js/vendor/angular.min.js',
                        'src/js/app.js',
                        'src/js/controllers/view.js',
                        'src/js/directives/list.js',
                        'src/js/directives/widgets/bookmark_widget.js',
                        'src/js/directives/widgets/calendar_widget.js',
                        'src/js/directives/widgets/clock_widget.js',
                        'src/js/directives/widgets/topsites_widget.js',
                        'src/js/filters/get_by_id.js'
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
                files: [    'src/js/vendor/angular.min.js',
                            'src/js/app.js',
                            'src/js/controllers/**/*.js',
                            'src/js/directives/**/*.js',
                            'src/js/filters/**/*.js'
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