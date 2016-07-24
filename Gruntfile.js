"use strict";
var _ = require( "underscore" );

var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require( "connect-livereload" )( { "port": LIVERELOAD_PORT } );

function mountFolder( connect, dir ){
    return connect.static( require( "path" ).resolve( dir ) );
}

module.exports = function runGrunt( grunt ){
    var yeomanConfig = {
        "app": "app",
        "dist": "dist"
    };

    var config = require( "load-grunt-configs" )( grunt, {
        "config": {
            "src": "conf/grunt/configurations/*.*"
        }
    } );

    require( "time-grunt" )( grunt );

    // Automatically load required Grunt tasks
    require( "jit-grunt" )( grunt, {
        "useminPrepare": "grunt-usemin"
    } );

    grunt.initConfig( _( config ).extend( {
        "yeoman": yeomanConfig,
        "watch": {
            "options": {
                "nospawn": true,
                "livereload": LIVERELOAD_PORT
            },
            "livereload": {
                "options": {
                    "livereload": grunt.option( "livereloadport" ) || LIVERELOAD_PORT
                },
                "files": [
                    "<%= yeoman.app %>/*.html",
                    "{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css",
                    "{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js",
                    "<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}",
                    "<%= yeoman.app %>/templates/*.html"
                ]
            }
        },
        "connect": {
            "options": {
                "port": grunt.option( "port" ) || SERVER_PORT,
                "hostname": "localhost"
            },
            "livereload": {
                "options": {
                    "middleware": function connectMiddleware( connect ){
                        return [
                            lrSnippet,
                            mountFolder( connect, ".tmp" ),
                            mountFolder( connect, yeomanConfig.app )
                        ];
                    }
                }
            },
            "dist": {
                "options": {
                    "middleware": function connectMiddleware( connect ){
                        return [
                            mountFolder( connect, yeomanConfig.dist )
                        ];
                    }
                }
            }
        },
        "open": {
            "server": {
                "path": "http://localhost:<%= connect.options.port %>"
            }
        },
        "clean": {
            "dist": [ ".tmp", "<%= yeoman.dist %>/*" ],
            "server": ".tmp"
        },
        "babel": {
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
                    "dest": "<%= yeoman.dist %>"
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
        },
        "requirejs": {
            "dist": {
                "options": {
                    "almond": true,

                    "mainConfigFile": "require-config.js",

                    "keepBuildDir": true,
                    "dir": ".tmp/scripts",

                    "optimize": "none",
                    "useStrict": true,
                    "wrap": true
                }
            }
        },
        "uglify": {
            "dist": {
                "files": {
                    "<%= yeoman.dist %>/scripts/main.js": [
                        ".tmp/scripts/main.js"
                    ]
                }
            }
        },
        "useminPrepare": {
            "html": "<%= yeoman.app %>/index.html",
            "options": {
                "dest": "<%= yeoman.dist %>"
            }
        },
        "usemin": {
            "html": [ "<%= yeoman.dist %>/{,*/}*.html" ],
            "css": [ "<%= yeoman.dist %>/styles/{,*/}*.css" ],
            "options": {
                "dirs": [ "<%= yeoman.dist %>" ]
            }
        },
        "imagemin": {
            "dist": {
                "files": [ {
                    "expand": true,
                    "cwd": "<%= yeoman.app %>/images",
                    "src": "{,*/}*.{png,jpg,jpeg}",
                    "dest": "<%= yeoman.dist %>/images"
                } ]
            }
        },
        "cssmin": {
            "dist": {
                "files": {
                    "<%= yeoman.dist %>/styles/main.css": [
                        ".tmp/styles/{,*/}*.css",
                        "<%= yeoman.app %>/styles/{,*/}*.css"
                    ]
                }
            }
        },
        "htmlmin": {
            "dist": {
                "options": {},
                "files": [ {
                    "expand": true,
                    "cwd": "<%= yeoman.app %>",
                    "src": "*.html",
                    "dest": "<%= yeoman.dist %>"
                } ]
            }
        },
        "copy": {
            "dist": {
                "files": [ {
                    "expand": true,
                    "dot": true,
                    "cwd": "<%= yeoman.app %>",
                    "dest": "<%= yeoman.dist %>",
                    "src": [
                        "*.{ico,txt}",
                        "images/{,*/}*.{webp,gif}",
                        "styles/fonts/{,*/}*.*",
                    ]
                }, {
                    "src": "node_modules/apache-server-configs/dist/.htaccess",
                    "dest": "<%= yeoman.dist %>/.htaccess"
                } ]
            }
        },
        "rev": {
            "dist": {
                "files": {
                    "src": [
                        "<%= yeoman.dist %>/scripts/{,*/}*.js",
                        "<%= yeoman.dist %>/styles/{,*/}*.css",
                        "<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}",
                        "<%= yeoman.dist %>/styles/fonts/{,*/}*.*",
                    ]
                }
            }
        }
    } ) );

    grunt.registerTask( "serve", function serveApplication(){
        grunt.task.run( [
            "build",
            "open:server",
            "connect:dist:keepalive"
        ] );

        grunt.task.run( [
            "clean:server",
            "connect:livereload",
            "open:server",
            "watch"
        ] );
    } );

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

    grunt.registerTask( "default", [
        "build"
    ] );
};
