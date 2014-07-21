'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('lightbox');



angular.module('lightbox')
    .directive('lightboxThumb', function() {
        return {
            restrict: 'C',
            replace: false,
            link: function(scope, element, attr) {
                element.on('click', function() {
                    var imagePath = element.attr('src');
                    scope.$emit('openLightbox', {src: imagePath});
                });
            }
        };
    })
    .directive('lightbox', function() {
        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                $scope.closeLightbox = function () {
                    $scope.showLightbox = false;
                };

                $rootScope.$on('openLightbox', function(event, payload) {
                    $scope.imagePath = payload.src;
                    $scope.showLightbox = true;
                    $scope.$apply();
                });

                $rootScope.$on('closeLightbox', $scope.closeLightbox);
            }],
            templateUrl: 'modules/lightbox/lightboxWindow.client.view.html'
        };
    });


