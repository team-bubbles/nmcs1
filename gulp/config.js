var dest = "./build";
var src = './src';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  sass: {
    src: src + "/sass/*.{sass,scss}",
    dest: dest,
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      imagePath: '/images' // Used by the image-url helper
    }
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },
  markup: {
    src: src + "/htdocs/**",
    dest: dest
  },
  webfonts: {
    src: src + "/webfonts/**",
    dest: dest + "/webfonts"
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/javascript/app.js',
      dest: dest,
      outputName: 'app.js',
      extensions: ['.hbs']
    }]
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  }
};
