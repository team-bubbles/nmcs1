### Template Workflow

The template now uses a collection of tools, tasks, and workflows to make development easier and code quality higher.

Technologies include:
- [Browserify](http://browserify.org/) (with [browserify-shim](https://github.com/thlorenz/browserify-shim))
- [Watchify](https://github.com/substack/watchify) (caching version of browserify for super fast rebuilds)
- [SASS](http://sass-lang.com/) (with [compass](http://compass-style.org/) and [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap)!)
- [jQuery](http://jquery.com/) (from npm)
- [Backbone](http://backbonejs.org/) (from npm)
- [BrowserSync](http://browsersync.io) for live reloading and a static server
- Image optimization
- Error Notifications in Notification Center
- Non common-js vendor code (like a jQuery plugin)

If you've never used Node or npm before, you'll need to install Node.
If you use homebrew, do:

```
brew install node
```

Otherwise, you can download and install from [here](http://nodejs.org/download/).

### Install Gulp Globally

Gulp must be installed globally in order to use the command line tools. *You may need to use `sudo`*


```
npm install -g gulp
```

Alternatively, you can run the version of gulp installed local to the project instead with


```
./node_modules/.bin/gulp
```

### Install Sass and Compass (if you haven't already)


The gulp-compass module relies on Compass already being installed on your system.

If you have bundler installed, simply run bundle to install dependencies from the `Gemfile`


```
bundle
```

Otherwise,


```
gem install sass
gem install compass --pre
```

### Install npm dependencies

```
npm install
```

This runs through all dependencies listed in `package.json` and downloads them
to a `node_modules` folder in your project directory.

### Run gulp and be amazed.

```
gulp
```

This will run the `default` gulp task defined in `gulp/tasks/default.js`, which does the following:
- Run 'watch', which has 2 task dependencies, `['setWatch', 'browserSync']`
- `setWatch` sets a variable that tells the browserify task whether or not to use watchify.
- `browserSync` has `build` as a task dependecy, so that all your assets will be processed before browserSync tries to serve them to you in the browser.
- `build` includes the following tasks: `['scripts', 'browserify', 'sass', 'images', 'markup']`

### In Case It Breaks

Issues we ran in when working the flow on other machines, especially IGM lab machines:
- xcode CLI tools neeeds to be installed on mac
- image minify module breaks
- sass 3.4.6 breaks. revert to 3.4.5 fixes it

 (╯°□°）╯︵ ┻━┻) 

### Configuration
All paths and plugin settings have been abstracted into a centralized config object in `gulp/config.js`. Adapt the paths and settings to the structure and needs of your project.
