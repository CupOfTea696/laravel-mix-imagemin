# Mix Imagemin

![npm](https://img.shields.io/npm/dt/laravel-mix-imagemin.svg)
![npm](https://img.shields.io/npm/v/laravel-mix-imagemin.svg)
![npm](https://img.shields.io/npm/l/laravel-mix-imagemin.svg?color=%23458778)

This extension provides Imagemin support to your Mix (v2.1 and up) builds.

## Usage

First, install the extension via npm or yarn.

```bash
$ npm install --save-dev laravel-mix-imagemin
$ yarn add --dev laravel-mix-imagemin
```

Next, require it in your `webpack.mix.js` file like below. Images will be copied and minified into the public path. Any files matched that aren't images will simply be copied to the public path.

```js
let mix = require('laravel-mix');

require('laravel-mix-imagemin');

mix
    .js('resources/js/app.js', 'public/js')
    .imagemin('img/*');
```

## Configuration

This extension uses the webpack [CopyPlugin](https://github.com/webpack-contrib/copy-webpack-plugin) and [ImageminPlugin](https://github.com/Klathmon/imagemin-webpack-plugin) to minify any images. The `mix.imagemin` function accepts 3 parameters. The first two are `patterns` and `copyOptions`, which are passed directly to the CopyPlugin's `patterns` and `options` parameters respectively. The third parameter is `imageminOptions`, which is passed to the ImageminPlugin's `options` parameter.

The `patterns` parameter is automatically converted to an array, so you can just pass a `string` or `object`. the `copyOptions` and `imageminOptions` parameters are optional.

For all available options, see [CopyPlugin options](https://github.com/webpack-contrib/copy-webpack-plugin#options) and [ImageminPlugin options](https://github.com/Klathmon/imagemin-webpack-plugin#api).

```js
let mix = require('laravel-mix');

require('laravel-mix-imagemin');

// Copy all files within `resources` matching `img/**.*` into the public path, preserving the file tree.
// Minify all images, `optipng` with `optimizationLevel` 5, disabling `jpegtran`, and adding `mozjpeg`.
mix
    .js('resources/js/app.js', 'public/js')
    .imagemin(
        'img/**.*',
        {
            context: 'resources',
        },
        {
            optipng: {
                optimizationLevel: 5
            },
            jpegtran: null,
            plugins: [
                require('imagemin-mozjpeg')({
                    quality: 100,
                    progressive: true,
                }),
            ],
        }
    );
```
