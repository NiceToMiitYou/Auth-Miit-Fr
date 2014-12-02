"use strict";

window.ITEventApp = angular.module( 'ITEventApp', [] );

/*
 * Use it as it-blur="(condition === true) to blur a field, like ng-show=""
 */

ITEventApp.directive('itBlur', [ '$timeout', function($timeout) {
    return {
        link: function(scope, element, attrs) {

            scope.$watch(attrs.itBlur, function(value) {
                if(value === true) { 
                    
                    $timeout(function() {
                        element[0].blur();

                        scope[attrs.itBlur] = false;
                    });
                }
            });
        }
    };
} ] );

/*
 * Use it as it-focus="(condition === true) to focus a field, like ng-show=""
 */

ITEventApp.directive('itFocus', [ '$timeout', function($timeout) {
    return {
        link: function(scope, element, attrs) {

            scope.$watch(attrs.itFocus, function(value) {
                if(value === true) { 
                    
                    $timeout(function() {
                        element[0].focus();

                        scope[attrs.itFocus] = false;
                    });
                }
            });
        }
    };
} ] );
