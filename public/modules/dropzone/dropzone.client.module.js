'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('dropzone');

var dropzoneDirective = function() {
    return {
        restrict: 'C',
        replace: false,
        link: function (scope, el, attr) {
            el.dropzone();
        }
    };
};

angular.module('dropzone').directive('dropzone', dropzoneDirective);
