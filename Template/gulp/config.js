var dest = "./build";
var src = './src';

module.exports = {
  browserSync: {
    server: {
      // We're serving the src folder as well
      // for sass sourcemap linking
      baseDir: [dest, src]
    },
    files: [
      dest + "/**",
      // Exclude Map files
      "!" + dest + "/**.map"
    ]
  },
  sass: {
    src: src + "/sass/*.{sass, scss}",
    dest: dest + "/css"
  },
  images: {
    src: src + "/img/**",
    dest: dest + "/img"
  },
  markup: {
    src: src + "/htdocs/**",
    dest: dest
  },
  browserify: {
    // Enable source maps
    debug: true,
    // Additional file extentions to make optional
    // extensions: ['.coffee', '.hbs'],
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: './src/javascript/app.js',
      dest: dest + "/js",
      outputName: 'app.js'
    }, {
      entries: './src/javascript/head.js',
      dest: dest + "/js",
      outputName: 'head.js'
    }]
  },
  scripts: [{
    src: src + "/javascript/concat/head/*.js",
    dest: dest + "/js",
    outputName: 'concatedHead.js',
  }, {
    src: [
      src + "/javascript/concat/app/jquery.js",
      src + "/javascript/concat/app/jquery-scrollto.js",
      src + "/javascript/concat/app/foundation.js",
      src + "/javascript/concat/app/custom.js",
    ],
    dest: dest + "/js",
    outputName: 'concatedApp.js'
  }]
};
