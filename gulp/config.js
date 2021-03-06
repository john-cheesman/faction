module.exports = {
    scripts: {
        watch: './src/js/**/*.js',
        src: './src/js/index.js',
        dest: './web/js',
        outputName: 'scripts.js'
    },
    clean: {
        scripts: './web/js'
    },
    images: {
        watch: './src/images/**/*.png',
        src: './src/images/**/*.png',
        dest: './web/images'
    },
    maps: {
        watch: './src/maps/**/*.json',
        src: './src/maps/**/*.json',
        dest: './web/maps'
    },
    data: {
        watch: './src/data/**/*.json',
        src: './src/data/**/*.json',
        dest: './web/data'
    },
    serve: {
        base: './web',
        port: 8080
    }
};
