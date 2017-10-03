/*
 * grunt-html-split
 * https://github.com/mas99001/grunt-html-split
 *
 * Copyright (c) 2017 Aditya Kumar
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs');
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('html_split', 'splits html files on a handle and outputs htmls surrounded by handels', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        src: "src/",
        wildcard: "*.html",
        dest: "dist/",
        handler: "<!--DS22SD-->",
        filenameSuffixPreHandler: "<html-split-title>",
        filenameSuffixPostHandler: "</html-split-title>"
    });
    var wc = ".";
    var filelist = [];
    console.log('\x1b[45m%s\x1b[0m', 'dest:= ' + options.dest);
    console.log('\x1b[45m%s\x1b[0m', 'src:= ' + options.src);
    var lastChar = options.dest.substr(-1);
    if (lastChar != '/') {
        options.dest = options.dest + '/';
    }
    lastChar = options.src.substr(-1);
    if (lastChar == '/') {
        options.src = options.src.slice(0, -1);
    }
    var target = grunt.option('target') || "";
    if(target !== ""){
        var targetArray = grunt.option('target').split(',');
        console.log('\x1b[45m%s\x1b[0m', 'target:= ' + targetArray);
        options.wildcard = 'target';
        targetArray.forEach(function(file) {
            filelist.push(options.src+'/'+file);
        });
    }
    console.log('\x1b[45m%s\x1b[0m', 'dest:= ' + options.dest);
    console.log('\x1b[45m%s\x1b[0m', 'src:= ' + options.src);

    var walk = function(dir) {
        console.log("Begining WALK with : " + dir);
        var files = fs.readdirSync(dir);
        files.forEach(function(file) {
            if (fs.statSync(dir + '/' + file).isDirectory()) {
            }
            else { 
              if (file.includes(wc)) 
                filelist.push(dir+'/'+file); 
            }
        });
    };

    var walkRecursive = function(dir) {
      console.log('\x1b[34m%s\x1b[0m', "Begining WALKRecursive with : " + dir);
        var files = fs.readdirSync(dir);
        files.forEach(function(file) {
            if (fs.statSync(dir + '/' + file).isDirectory()) {
                walkRecursive(dir + '/' + file);
            }
            else { 
              if (file.includes(wc)) 
                filelist.push(dir+'/'+file); 
            }
        });
    };

    var isEven = function(n) {
        var nin = Number(n);
        return nin === 0 || !!(nin && !(nin%2));
    }
    var isOdd = function(n) {
        return isEven(Number(n) + 1);
    }
    var lCreateDirs = function(path){
        var pathArray = path.split('/');
        var pEle = '';
        pathArray.forEach(function(ele){
            pEle += ele + '/';
            console.log('\x1b[45m%s\x1b[0m', pEle);
            if(!fs.existsSync(pEle))
                fs.mkdirSync(pEle);
        });
    }

    var applyHandler = function() {
        console.log('\x1b[32m%s\x1b[0m', "Begining applyHandler");
        filelist.forEach(function(element) {
          var filename = element.replace(/^.*[\\\/]/, '')
            var sourceHtml = fs.readFileSync(element, 'utf8');
            var sourceHtmlgArray = sourceHtml.split(options.handler);
            if(!fs.existsSync(options.dest))
                lCreateDirs(options.dest.slice(0, -1));
            var index = 0;
            var splitIndex = 0;
            sourceHtmlgArray.forEach(function(ele){
                if(isOdd(index)){
                splitIndex += 1;
                var filenameSuffix;
                var filenameSuffixArray = sourceHtmlgArray[index].split(options.filenameSuffixPreHandler);
                if (filenameSuffixArray.length >= 3 && filenameSuffixArray[1].indexOf(options.filenameSuffixPostHandler) === -1) {
                    filenameSuffix = filenameSuffixArray[1];
                } else if (filenameSuffixArray.length === 2 || (filenameSuffixArray.length >= 3 && filenameSuffixArray[1].indexOf(options.filenameSuffixPostHandler) > -1)) {
                    filenameSuffix = filenameSuffixArray[1].split(options.filenameSuffixPostHandler)[0];
                }
                if(filenameSuffix) {
                    filenameSuffix = "_" + filenameSuffix
                                        .trim()
                                        .replace(/\s+/g, "-")
                                        .toLowerCase();
                  } else {
                    filenameSuffix = "";
                  }
                  console.log('\x1b[31m%s\x1b[0m', filename);
                  var pattrn_name = filename.replace(".html", "").replace("patterns-", "");
                  pattrn_name = options.dest + pattrn_name + "/";
                  lCreateDirs(pattrn_name);
                  console.log("Index: " + index);
                  console.log("splitIndex: " + splitIndex);
                  console.log("filenameSuffix: " + filenameSuffix);
                  fs.writeFileSync(pattrn_name + splitIndex + filenameSuffix + ".html", sourceHtmlgArray[index], 'utf-8');
                }
                index += 1;
            })
        }, this);
    };

    switch(options.wildcard) {
        case '*.*':       wc = ".";     walk(options.src);          break;
        case '*.html':    wc = ".html"; walk(options.src);          break;
        case '*.js':      wc = ".js";   walk(options.src);          break;
        case '**':        wc = ".";     walkRecursive(options.src); break;
        case '**/*':      wc = ".";     walkRecursive(options.src); break;
        case '**/*.html': wc = ".html"; walkRecursive(options.src); break;
        case '**/*.js':   wc = ".js";   walkRecursive(options.src); break;
        default:          wc = ".";
    }
    console.log('\x1b[36m%s', 'Following are the files: '); 
    console.log(filelist);
    applyHandler();
  });
};
