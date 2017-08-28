# grunt-html-split

> splits html files on a handle and outputs htmls surrounded by handels

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html-split --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html-split');
```

## The "html_split" task

### Overview
In your project's Gruntfile, add a section named `html_split` to the data object passed into `grunt.initConfig()`.

```js
    grunt.initConfig({
      html_split: {
          options: {
            src: "src",
            wildcard: "**/*.html",
            dest: "dist/",
            handler: "<!--DS22SD-->"
          },
          files: {
            'dest/default_options': ['src/srcfile', 'src/123'],
          }
        },
      });
```

### package.json
```js
  "devDependencies": {
    "grunt": "~0.4.2",
    "grunt-html-split": "^0.1.0"
  },
  "engines": {
    "node": ">=0.8.0"
  }
```

### Options

#### options.src
Type: `String`
Default value: `'src'`

Folder name which contains input html / js files.

#### options.wildcard
Type: `String`
Default value: `'*.html'`

A string value that is used to store filter for the files.

#### options.dest
Type: `String`
Default value: `'destination/'`

Folder name which contains output html / js files.

#### options.handler
Type: `String`
Default value: `'<!--DS22SD-->'`

Handler using which html / js files are split.

#### options.files

You can ignore this for now

### Usage Examples

#### Default Options
In this example, the default options are used to do split for the filterd files for the source folder.
So all the html files from the `src` folder are picked recursively, and splited on the handler `<!--DS22SD-->`
and the partials surrounded by `<!--DS22SD-->` are outputed to the folder `dist`, 
Multiple partials are named with originial appended with incremental index `1, 2, 3....`

```js
grunt.initConfig({
  html_split: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, the custom options from the task configured in gruntfile.js are used to do split.
Filter applied here is all files recursively from the directory structure are picked from the source folder `'src'`.
So all the files from the `src` folder are picked recursively, and splited on the handler `<!--DS22SD-->`
and the partials surrounded by `<!--DS22SD-->` are outputed to the folder `destination`, 
Multiple partials are named with originial appended with incremental index `1, 2, 3....`

```js
      html_split: {
          options: {
            src: "src",
            dest: "destination/",
            wildcard: "**/*",
            handler: "<!--DS22SD-->"
          },
          files: {
            'dest/default_options': ['src/srcfile', 'src/123'],
          }
        },
      })
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
