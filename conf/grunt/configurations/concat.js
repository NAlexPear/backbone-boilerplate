module.exports = function getConcatConfig( grunt, options ){
    return {
        "src": [ `${options.yeoman.dist}/scripts/app.js` ],
        "dest": `${options.yeoman.dist}/scripts/app.js`,
        "options": {
            "footer": "\n\nrequirejs( [ \"app\" ] );"
        }
    };
};
