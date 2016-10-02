module.exports = function(grunt) {
    grunt.initConfig({
        markdown: {
            all: {
                files: [{
                    expand: true,
                    src: '*.md',
                    dest: '.',
                    ext: '.html'
                }]
            }
        }, 
        watch: {
            files: '*.md',
            tasks: ['markdown'],
            options: {
                interrupt: true,
            },
        }
    });

    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-watch');

}


