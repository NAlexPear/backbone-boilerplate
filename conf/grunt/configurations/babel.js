module.exports = function getBabelConfig( grunt, options ){
    return {
        "build": {
            "options": {
                "presets": [ "es2015" ],
                "plugins": [ "transform-es2015-modules-amd" ],
                "comments": false
            },
            "files": [ {
                "expand": true,
                "cwd": "<%= yeoman.app %>",
                "src": [ "**/*.js", "!require-config.js" ],
                "dest": options.yeoman.dist
            } ]
        },
        "test": {
            "options": {
                "presets": [ "es2015" ],
                "plugins": [ "transform-es2015-modules-commonjs" ],
                "comments": false
            },
            "files": [ {
                "expand": true,
                "cwd": "test/src",
                "src": [ "**/*.js" ],
                "dest": "test/run"
            } ]
        }
    };
};
