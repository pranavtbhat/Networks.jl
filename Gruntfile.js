module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      options: {
        background: true
      },
      dev: {
        options: {
          script: 'bin/dev'
        }
      }
    },
    jshint: {
      files: ['assets/javascripts{,*/}', 'app.js', 'routs{,*/}', 'bin{,*/}'],
      options: {
        globals: {}
      }
    },
    watch: {
      options: {
        livereload: true
      },
      gruntfile:{
        files: ['Gruntfile.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false,
          reload: true
        }
      },
      express: {
        files: ['bin/*', 'routes/*.js', 'app.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      },
      assets: {
        files: ['assets/**/*'],
        tasks: ['clean', 'copy', 'express:dev']
      }
    },
    clean: ["public/{,*/}*"],
    copy: {
      main: {
        files: [{
          expand: true,
          src: ['assets/images/*'],
          dest: 'public/images/',
          flatten: 'true'
        }, {
          expand: true,
          cwd: 'assets/javascripts/',
          src: ['**/*'],
          dest: 'public/javascripts/'
        }, {
          expand: true,
          src: ['assets/stylesheets/*'],
          dest: 'public/stylesheets/',
          flatten: 'true'
        }, {
          expand: true,
          src: ['assets/fonts/*'],
          dest: 'public/fonts/',
          flatten: 'true'
        }, {
          expand: true,
          src: ['node_modules/bootstrap/dist/css/*'],
          dest: 'public/stylesheets/',
          flatten: 'true'
        }, {
          expand: true,
          src: ['node_modules/bootstrap/dist/js/*'],
          dest: 'public/javascripts/',
          flatten: 'true'
        }, {
          expand: true,
          src: ['node_modules/bootstrap/dist/fonts/*'],
          dest: 'public/fonts/',
          flatten: 'true'
        }, {
          expand: true,
          cwd: 'node_modules/sigma/build/',
          src: ['**/*'],
          dest: 'public/javascripts/sigma/'
        }],
      },
    },
  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.registerTask('dev', [
    'clean',
    'copy',
    'express:dev',
    'watch'
  ]);

};
