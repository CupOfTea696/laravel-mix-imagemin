const mix = require('laravel-mix');
const Imagemin = require('./src/Imagemin.js');

mix.extend('imagemin', new Imagemin());
