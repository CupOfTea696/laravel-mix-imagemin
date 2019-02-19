class ManifestPlugin {
    apply(compiler) {
        const onAfterEmit = (compilation, callback) => {
            const manifest = Mix.manifest.manifest;

            Object.keys(compilation.assets).forEach(asset => {
                if (! manifest[asset]) {
                    Mix.manifest.add(asset);
                }
            });

            callback();
        };

        compiler.hooks.afterEmit.tapAsync(this.constructor.name, onAfterEmit);
    }
}

module.exports = ManifestPlugin;
