module.exports = function getConcatConfig( grunt, options ){
    return {
        "dist": {
            "src": [ `${options.yeoman.dist}/scripts/app.js` ],
            "dest": `${options.yeoman.dist}/scripts/app.js`,
        },
        "options": {
            "footer": "\n\nrequirejs( [ \"app\" ], function startApplication( App ){ var app = new App.default(); app.start(); });"
        }
    };
};
