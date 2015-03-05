var fs = require('fs');

module.exports = function(grunt) {

  var browsers = grunt.option('browser') ? grunt.option('browser').split(',') : ['PhantomJS'];

  var copyright = '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                   '*   Copyright (c) <%= grunt.template.today("yyyy") %> Environmental Systems Research Institute, Inc.\n' +
                   '*   Apache 2.0 License ' +
                   '*/\n\n';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef:  true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          XMLHttpRequest: true,
          ActiveXObject: true,
          module: true,
          L:true
        }
      },
      all: ['src/*.js']
    },

    concat: {
      options: {
        banner: copyright,
        sourceMap: true,
        separator: '\n\n'
      },
      js: {
        src: [
          'src/EsriLeafletRelated.js'
        ],
        dest: 'dist/esri-leaflet-related.js'
      }
    },

    uglify: {
      options: {
        wrap: false,
        preserveComments: 'some',
        report: 'gzip',
        banner: copyright,
        sourceMap: true,
        sourceMapIncludeSources: true,
      },
      dist: {
        files: {
          'dist/esri-leaflet-related.min.js': [
            'dist/esri-leaflet-related.js'
          ]
        }
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      run: {
        reporters: ['progress'],
        browsers: browsers
      },
      coverage: {
        reporters: ['progress', 'coverage'],
        browsers: browsers,
        preprocessors: {
          'src/**/*.js': 'coverage'
        }
      },
      watch: {
        singleRun: false,
        autoWatch: true,
        browsers: browsers
      }
    },

    watch: {
      scripts: {
        files: [
          'src/**/*.js',
          'src/*.js'
        ],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      }
    },

    s3: {
      options: {
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        bucket: '<%= aws.bucket %>',
        access: 'public-read',
        headers: {
          // 1 Year cache policy (1000 * 60 * 60 * 24 * 365)
          "Cache-Control": "max-age=630720000, public",
          "Expires": new Date(Date.now() + 63072000000).toUTCString()
        }
      },

      releaseable: {
        release: {
          options: {
            remote: 'origin',
            dryRun: grunt.option('dryRun') ? grunt.option('dryRun') : false,
            silent: false
          },
          src: [ 'dist/**/*.js','dist/**/*.map' ]
        }
      },

      dev: {
        upload: [
          {
            src: 'dist/*',
            dest: 'esri-leaflet-related/<%= pkg.version %>/'
          },
          {
            src: 'dist/img/*',
            dest: 'esri-leaflet-related/<%= pkg.version %>/img'
          }
        ]
      }
    }

  });

  var awsExists = fs.existsSync(process.env.HOME + '/esri-leaflet-s3.json');

  if (awsExists) {
    grunt.config.set('aws', grunt.file.readJSON(process.env.HOME + '/esri-leaflet-s3.json'));
  }

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['jshint', 'concat', 'uglify', /*'imagemin', 'cssmin'*/]);
  grunt.registerTask('prepublish', ['concat', 'uglify', /*'imagemin', 'cssmin'*/]);
  grunt.registerTask('release', ['releaseable', 's3']);
  grunt.registerTask('test', ['jshint', 'karma:run']);

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-releaseable');
};