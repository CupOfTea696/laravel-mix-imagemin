const multimatch = require('multimatch');

class ManifestPlugin {
    constructor(patterns = []) {
        this.patterns = patterns;
    }

    apply(compiler) {
        const onAfterEmit = (compilation, callback) => {
            const manifest = Mix.manifest.manifest;

            Object.keys(compilation.assets).forEach(asset => {
                if (! manifest[asset] && multimatch(asset, this.patterns)) {
                    Mix.manifest.add(asset);
                }
            });

            callback();
        };

        compiler.hooks.afterEmit.tapAsync(this.constructor.name, onAfterEmit);
    }
}

module.exports = ManifestPlugin;
