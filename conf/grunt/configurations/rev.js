module.exports = function getRevConfig( grunt, options ){
    return {
        "dist": {
            "files": {
                "src": [
                    `${options.yeoman.dist}/scripts/{,*/}*.js`,
                    `${options.yeoman.dist}/styles/{,*/}*.css`,
                    `${options.yeoman.dist}/images/{,*/}*.{png,jpg,jpeg,gif,webp}`,
                    `${options.yeoman.dist}/styles/fonts/{,*/}*.*`,
                ]
            }
        }
    };
};
