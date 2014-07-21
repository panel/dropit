'use strict';

var path = require('path'),
    fs = require('fs'),
    knox = require('knox'),
    Busboy = require('busboy');

/**
 * Module dependencies.
 */
exports.read = function (req, res) {
    fs.readdir(path.join('.', 'public', 'uploads'), function (err, files) {
        if(err) {
            req.status(500).render('500', {
                error: err.stack
            });
        }

        var uploads = files.map(function (filename) {
            return '/public/uploads/' + filename;
        });

        console.log(uploads);
        res.json(uploads);
    });
};

exports.create = function (req, res) {
    var busboy = new Busboy({headers: req.headers});

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        var saveTo = path.join('.', 'public', 'uploads', path.basename(filename));
        console.log(saveTo);
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function() {
        res.writeHead(200, { 'Connection': 'close' });
        res.end('That\'s all folks!');
    });

    return req.pipe(busboy);
};

exports.getFile = function (req, res) {
    var imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'pict'];
    var fileType = req.params.filename.split('.').pop().toLowerCase();

    if(imageTypes.indexOf(fileType) > -1) {
        res.writeHead(200, {'Content-Type': 'image/' + fileType });
    }
    fs.createReadStream(path.join('public', 'uploads', req.params.filename)).pipe(res);
};
