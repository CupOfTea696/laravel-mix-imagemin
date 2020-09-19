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

    register(patterns, copyOptions = {}, imageminOptions = {}) {
        this.patterns = [].concat(patterns);

        let copyPatterns = [];
        for (var i = 0; i < this.patterns.length; i++) {
            const pattern = this.patterns[i].replace(/^\/+/g, '');

            copyPatterns.push({
                from: pattern,
                to: pattern,
                context: 'resources'
            });
        }

        this.copyOptions = Object.assign({
            patterns: copyPatterns,
        }, copyOptions);

        this.imageminOptions = Object.assign({
            test: /\.(jpe?g|png|gif|svg)$/i,
        }, imageminOptions);
    }

    webpackPlugins() {
        const ImageminPlugin = require('imagemin-webpack-plugin').default;
        const CopyWebpackPlugin = require('copy-webpack-plugin');
        let {patterns, copyOptions, imageminOptions} = this;

        return [
            new CopyWebpackPlugin(copyOptions),
            new ImageminPlugin(imageminOptions),
            new ManifestPlugin(patterns),
        ];
    }
}

module.exports = Imagemin;
