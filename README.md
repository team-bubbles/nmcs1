Portfolio Template
=====

Portfolio Template built by a team of 5 RIT students. Kara Williams, Kaleigh Yang, Changbai Li, Jurian Hoff, Marco Fragale.

I'm currently in the process of converting this into a WordPress Theme, or use WordPress as backend for this.

How to use
=====

1. Follow the instructions below to set up the workflow
2. For style changes, go to `src/sass`
3. For html markup changes, go to `src/htdocs`
4. Take all files in the `build` folder and put it at your root directory

Template Workflow
=====

The template now uses a collection of tools, tasks, and workflows to make development easier and code quality higher.

Technologies include:
- [Browserify](http://browserify.org/) (with [browserify-shim](https://github.com/thlorenz/browserify-shim))
- [Watchify](https://github.com/substack/watchify) (caching version of browserify for super fast rebuilds)
- [SASS](http://sass-lang.com/) (super fast libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap), and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- [CoffeeScript](http://coffeescript.org/) (with source maps!)
- [BrowserSync](http://browsersync.io) for live reloading and a static server
- [Image optimization](https://www.npmjs.com/package/gulp-imagemin)
- Error handling in the console [and in Notification Center](https://github.com/mikaelbr/gulp-notify)
- Shimming non common-js vendor code with other dependencies (like a jQuery plugin)

If you've never used Node or npm before, you'll need to install Node.
If you use homebrew, do:

```
brew install node
```

Otherwise, you can download and install from [here](http://nodejs.org/download/).

Afterwards, update npm with:

```
npm install npm -g
```

### Install Gulp Globally

Gulp must be installed globally in order to use the command line tools. *You may need to use `sudo`*


```
npm install -g gulp
```

Alternatively, you can run the version of gulp installed local to the project instead with


```
./node_modules/.bin/gulp
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

##### For production, run `gulp production`.

##### For icon font generation, run `gulp iconFont`.

### In Case It Breaks

Issues we ran in when working the flow on other machines, especially IGM lab machines:
- xcode CLI tools neeeds to be installed on mac
- image minify module acts weird due to npm version. Simply comment out imagemin related lines in Template/gulp/tasks/images.js

(╯°□°）╯︵ ┻━┻)

### Configuration
All paths and plugin settings have been abstracted into a centralized config object in `gulp/config.js`. Adapt the paths and settings to the structure and needs of your project.
