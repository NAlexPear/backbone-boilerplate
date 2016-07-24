module.exports = function getCopyConfig( grunt, options ){
    return {
        "dist": {
            "files": [ {
                "expand": true,
                "dot": true,
                "cwd": options.yeoman.app,
                "dest": options.yeoman.dist,
                "src": [
                    "*.{ico,txt}",
                    "images/{,*/}*.{webp,gif}",
                    "styles/fonts/{,*/}*.*",
                ]
            }, {
                "src": "node_modules/apache-server-configs/dist/.htaccess",
                "dest": `${options.yeoman.dist}/.htaccess`
            } ]
        }
    };
};
