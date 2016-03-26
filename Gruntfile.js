var autoprefix = require('less-plugin-autoprefix');
var cleancss = require('less-plugin-clean-css');
var pngquant = require('imagemin-pngquant');
var optipng = require('imagemin-optipng');
var advpng = require('imagemin-advpng');
var zopfli = require('imagemin-zopfli');
var pngcrush = require('imagemin-pngcrush');
var pngout = require('imagemin-pngout');

module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

   /**
    * Compile less to css
    */
    less: {
      all: {
        options: {
          plugins: [
            new autoprefix({browsers: ["last 2 versions"]}),
            new cleancss({advanced: true})
          ],
        },
        files: {
          "www/css/bacisovi-tode.css": "www/less/index.less"
        }
      }
    },

   /**
    * Concat & minify javascripts
    */
    //uglify: {
    //  all: {
    //    files: {
    //      'www/js/main.min.js': [
    //        'node_modules/jquery/dist/jquery.min.js',
    //        'node_modules/bootstrap/js/transition.js',
    //        'node_modules/bootstrap/js/carousel.js',
    //        'node_modules/bootstrap/js/collapse.js',
    //        'www/js/src/**/*.js'
    //      ]
    //    }
    //  }
    //},

    /**
     * Optimize images with imagemin
     */
    imagemin: {
      options: {
        optimizationLevel: 3,
        use: [pngquant(), optipng(), advpng(), zopfli(), pngcrush(), pngout()],
      },
      // wide images for carousel
      all: {
        files: [{
          expand: true,
          cwd: 'www/img-src',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'www/img'
        }]
      }
    },

    copy: {
      // copy bootstrap fonts for website use
      bsGlyphicons: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/bootstrap/fonts',
            src: ['**'],
            dest: 'www/fonts'
          },
        ]
      },
      // copy font-awesome fonts for website use
      fontAwesome: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/font-awesome/fonts',
            src: ['**'],
            dest: 'www/fonts'
          },
        ]
      }
    },

   // ///**
    // * Deploy to production server
    // */
    //ftp_push: {
    //  your_target: {
    //    options: {
    //      authKey: "endora",
    //      host: "srv80.endora.cz",
    //      dest: '/fbctremosnice.4fan.cz/web/',
    //      port: 21
    //    },
    //    files: [
    //      {
    //        expand: true,
    //        cwd: '.',
    //        src: [
    //          // server configuation files
    //          ".htaccess",
    //          "web.config",
    //          "./**/*/.htaccess",
    //          "./**/*/web.config",
    //          // core of website
    //          "index.php",
    //          "robots.txt",
    //          "app/**/*.latte",
    //          "app/**/*.php",
    //          // php dependencies
    //          "vendor/**",
    //          // static assets
    //          "www/css/main.css",
    //          "www/fonts/**",
    //          "www/images/dist/**",
    //          "www/js/main.min.js",
    //        ]
    //      }
    //    ]
    //  }
    //},

   /**
    * Watch less, uglify
    */
    watch: {
      less: {
        files: ['www/less/**/*.less'],
        tasks: ['less'],
        options: {
          spawn: false,
        },
      }//,
      //scripts: {
      //  files: ['www/js/src/**/*.js'],
      //  tasks: ['uglify'],
      //  options: {
      //    spawn: false,
      //  }
      //}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-ftp-push');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('deploy', ['ftp_push']);//[ 'less', 'uglify', 'imagemin', 'copy']);
  //grunt.registerTask('default', [ 'less', 'uglify', 'imagemin', 'copy', 'watch']);
  grunt.registerTask('default', [ 'less', 'imagemin', 'copy', 'watch']);
};
