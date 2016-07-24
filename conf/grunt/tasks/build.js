module.exports = function gruntServe( grunt ){
    "use strict";

    grunt.registerTask( "build", [
        "clean:dist",
        "useminPrepare",
        "imagemin",
        "htmlmin",
        "concat",
        "cssmin",
        "requirejs",
        "babel:build",
        "uglify",
        "copy",
        "rev",
        "usemin"
    ] );
};
