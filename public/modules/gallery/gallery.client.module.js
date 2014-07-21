'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('gallery');

var GALLERY_MAX = 12;

var galleryController = function ($scope, $http) {
    function _updatePagination(images, page) {
        return images.splice(page * GALLERY_MAX, GALLERY_MAX);
    }

    $scope.uploads = [];

    $http.get('/uploads').then(function (res) {
        $scope.allUploads = res.data;
        $scope.uploads = $scope.allUploads.splice(0, GALLERY_MAX);
    });

    $scope.isPaginated = $scope.uploads.length > GALLERY_MAX;
    $scope.page = 0;

    $scope.nextPage = function () {
        $scope.page += 1;
        $scope.uploads = _updatePagination($scope.allUploads, $scope.page);
    };

    $scope.prevPage = function () {
        $scope.page -= 1;
        $scope.uploads = _updatePagination($scope.allUploads, $scope.page);
    };

    $scope.showNextPage = function () {
        return ($scope.page * GALLERY_MAX) < $scope.allUploads.length;
    };

    $scope.showPrevPage = function () {
        return $scope.page > 0;
    };

    $scope.isImage = function (filename) {
        var imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'pict'];
        var fileType = filename.split('.').pop();

        return imageTypes.indexOf(fileType) > -1;
    };
};

var galleryDirective = function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'modules/gallery/gallery.client.view.html',
        controller: ['$scope', '$http', galleryController]
    };
};

angular.module('dropzone').directive('gallery', galleryDirective);
