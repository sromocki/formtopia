var request = require("request");

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
        watch: {
            server: {
                files: ['services/*', 'models/*', 'config/*', 'views/*', 'run.js'],
            },
            client: {
                files: ['static/**/*', '!static/libs/**', 'views/*'],
            },
            options: {
                debounceDelay: 1000,
            }
        },
    });

    grunt.event.on('watch', function(action, filepath, target) {
        console.log(target);
        if (target == 'client') {
            request("http://www.formtopia.dev:35729/changed?files=" + filepath);        
        } else {
            request("http://www.formtopia.dev:3000/" + filepath);   
        } 
    });

    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['jshint','requirejs', 'less']);
    grunt.registerTask('libs',['copy:libs']);
};
