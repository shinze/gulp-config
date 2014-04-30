# A gulp and bower config for my everyday work



## Installation

Install via [npm](https://www.npmjs.org/).

```
$ npm install
```



## Running

```
$ ln -s node_modules/gulp/bin/gulp.js gulp
$ ./gulp
```



## The most important ! Favicons and touch icons

A PSD file can be found in `` ./src/favicons/HTML5-Boilerplate-Favicons.psd``.
To create the favicons and touch icons for the project, open and *save for the web* the files in `./src/favicons`.


## Javascript(s)

You should prefer something like a CDN for your libs.
My prefered solution for now : is [JSDeliver](http://www.jsdelivr.com/) and a [good article about that particular CDN](https://hacks.mozilla.org/2014/03/jsdelivr-the-advanced-open-source-public-cdn/).


## Everything else

Everything else is in `./src` and build in… `./build`.

* [Jade](http://www.jade-lang.com) for your templating;
* [Less-css](http://www.lesscss.org) for your CSS.

Images, CSS, JS assets will be in `.build/assets`.
