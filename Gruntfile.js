module.exports = function(grunt) {

    // Init configs
    grunt.initConfig({

        exec: {
            'broccoli_build': 'rm -rf dist && broccoli build dist',
            'broccoli_serve': 'broccoli serve',
        },

        clean: {
            js: ["dist/*.html"]
        }

    });


    // Task provides command line execution
    grunt.loadNpmTasks('grunt-exec');

    // Task provides removing files
    grunt.loadNpmTasks('grunt-contrib-clean');


    // Default task (Run server)
    grunt.registerTask('default', ['serve']);

    // Run server
    grunt.registerTask('serve', ['exec:broccoli_serve']);

    // Build
    grunt.registerTask('build', ['exec:broccoli_build', 'clean']);

};
