const ManifestPlugin = require('./ManifestPlugin.js');

class Imagemin {
    name() {
        return ['imagemin', 'images', 'img'];
    }

    dependencies() {
        this.requiresReload = `
            Imagemin's required plugins have been installed.
            Please run "npm run dev" again.
        `;

        return ['copy-webpack-plugin', 'imagemin-webpack-plugin'];
    }

    register(patterns, copyOptions = {}, imageminOptions = {}, selfOptions = {}) {
        this.patterns = [].concat(patterns);
        this.copyOptions = copyOptions;
        this.imageminOptions = Object.assign({
            test: /\.(jpe?g|png|gif|svg)$/i,
        }, imageminOptions);
        this.selfOptions = Object.assign({
            addToManifest: true,
        }, selfOptions);
    }

    webpackPlugins() {
        const ImageminPlugin = require('imagemin-webpack-plugin').default;
        const CopyWebpackPlugin = require('copy-webpack-plugin');
        let {patterns, copyOptions, imageminOptions, selfOptions} = this;

        const plugins = [
            new CopyWebpackPlugin(patterns, copyOptions),
            new ImageminPlugin(imageminOptions),
        ];

        if (selfOptions.addToManifest) {
            plugins.push(new ManifestPlugin(patterns));
        }

        return plugins;
    }
}

module.exports = Imagemin;
