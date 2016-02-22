// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
	
	// configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/js/app.js': 'src/js/app.js',
		  'dist/js/knockout-3.4.0.js': 'src/js/knockout-3.4.0.js',
		  'dist/js/oauth-signature.js': 'src/js/oauth-signature.js'
        }
      }
    },
	
	// configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/style.css': 'src/css/style.css'
        }
      }
    },
	
	htmlmin: {                                       // Task 
		dist: {                                      // Target 
		  options: {                                 // Target options 
			removeComments: true,
			collapseWhitespace: true
		  },
		  files: {                                   // Dictionary of files 
			'dist/index.html': 'src/index.html'      // 'destination': 'source' 
		  }
		}
    },
	
	imagemin: {                            // Task 
		dynamic: {                         // Target 
		  files: [{
			expand: true,                  // Enable dynamic expansion 
			cwd: 'src/',                   // Src matches are relative to this path 
			src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
			dest: 'dist/'                  // Destination path prefix 
		  }]
		}
    },
	
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  
  // ============= // CREATE TASKS ========== //
  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin', 'imagemin']);

};

