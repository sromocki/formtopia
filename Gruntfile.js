module.exports = function(grunt) {

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
    jshint: {
            files: ['www/js/**/*.js','Gruntfile.js'],
            options: {
		ignores : ['www/js/less.js','www/js/text.js','www/js/require.js'],
            },
        },
        copy : {
          libs : {
            src : 'bower_components/**',
            dest : 'static/libs/',
            expand : true,
          },
        },
        requirejs : {
            compile : {
                options : {
                    almond : true,
                    baseUrl : "www/js",
                    mainConfigFile : "www/js/main.js",
                    out : "build/release.min.js",
                    include : ["main"],
                },
            },
        },
        less : {
            compile : {
                files : {
                    "build/css/release.css" : "www/css/main.less",
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['jshint','requirejs', 'less']);
    grunt.registerTask('libs',['copy:libs']);
};
