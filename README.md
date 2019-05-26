# A gulp and bower config for my everyday work

------------------------
Deprecated
------------------------

## Install and get it to run

### 1. Install [Gulp](http://gulpjs.com/) globally :

```
$ npm install -g gulp
```

### 2. Project installation made via [npm](https://www.npmjs.org/).

```
$ npm install
```

### 3. Running Gulp

The *default* task for Gulp.

```
$ gulp
```

If you want a detailed view of every tasks avalaible

```
$ gulp -T
```





## The most important ! <small>Favicons and touch icons</small>

A PSD file can be found in `` ./src/favicons/HTML5-Boilerplate-Favicons.psd``.
To create the favicons and touch icons for the project, open and *save for the web* the files in `./src/favicons`.




## Javascript(s)

You should prefer something like a CDN for your libs.
My prefered solution for now : is [JSDeliver](http://www.jsdelivr.com/) and a [good article about that particular CDN](https://hacks.mozilla.org/2014/03/jsdelivr-the-advanced-open-source-public-cdn/).




## Everything else

Everything else is in `./src` and build in… `./build`.

* `./build` ** is the project’s *served root*. **
* `./src` ** is the project’s *source files* root. **
* [Jade](http://www.jade-lang.com) for your templating;
* [Less-css](http://www.lesscss.org) for your CSS.

Images, CSS, JS assets will be compressed and published in `.build/assets`.


## Resources
* [Learn LessCSS](http://lesscss.org/#getting-started);
* [Learn Jade](https://github.com/polypodes/Learn/blob/master/FrontEnd.md#jade-is-not-defined);
* The Favicon template source : [Drublic.de](http://drublic.de/blog/html5-boilerplate-favicons-psd-template/);
* The source of Everything : [HTML5BoilerPlate](https://github.com/h5bp/html5-boilerplate);
* About [Gulp and JS](https://blog.nodejitsu.com/npmawesome-9-gulp-plugins/).
