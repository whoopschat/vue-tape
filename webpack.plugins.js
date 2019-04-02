const replace = require('replace-in-file');
const { version } = require('./package.json');

exports.replace_file_plugin = (entry, outputPath) => {
    return {
        apply: (compiler) => {
            compiler.hooks.afterEmit.tap('replace_version_plugin', () => {
                try {
                    Object.keys(entry).forEach(name => {
                        const options = {
                            files: `${outputPath}/${name.toLowerCase()}.js`,
                            from: ['${lib_version}'],
                            to: [version],
                        }
                        replace.sync(options);
                    });
                } catch (err) {
                    console.error(err);
                }
            });
        }
    }
}