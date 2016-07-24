module.exports = function getUglifyConfig( grunt, options ){
    var mainPath = `${options.yeoman.dist}/scripts/main.js`;
    var filesArray = [
        ".tmp/scripts/main.js"
    ];
    
    var files = {};

    files[ mainPath ] = filesArray;

    return {
        "dist": {
            "files": files
        }
    };
};
