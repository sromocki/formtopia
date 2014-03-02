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
            cwd: 'bower_components/',
            src: ['**'],
            dest : 'static/libs/',
            expand : true,
          },
        },
        requirejs : {
            compile : {
                options : {
                    almond : true,
                    baseUrl : "static",
                    mainConfigFile : "static/app.js",
                    out : "build/release.min.js",
                    include : ["app"],
                },
            },
        },
        less : {
            compile : {
                files : {
                    "build/css/release.css" : "static/css/main.less",
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
