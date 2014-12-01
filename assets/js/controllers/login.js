"use strict";

ITEventApp.controller(
    'loginController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            var requestSend = false;

            function login() {

                if( !requestSend ) {

                    requestSend = true;

                    ITConnect.user.login( $scope.user.mail, $scope.user.password,
                        
                        function( data ) {
                            
                            if( data.done ) {
                            
                                $timeout(function() {
                                    
                                    // Step one just for check
                                    if ( $scope.s == 1 ) {

                                        $scope.user.newuser = !data.exist;
                                        $scope.s = 2;

                                        // Step two
                                    } else if ( $scope.s == 2 ) {

                                        // Check connected
                                        if ( data.connected ) {
                                            // Go to step 3
                                            $scope.user.connected = true;
                                            $scope.s = 3;

                                        } else {
                                            // Wrong password then
                                            $scope.wrpass = true;
                                        }
                                    } else if ( $scope.s == 3 ) {

                                        // If last step, connect
                                        window.location.pathname = '/redirect';
                                    }

                                    requestSend = false;
                                } );    
                            } else {

                                requestSend = false;
                            }
                        } );
                }
            }

            function register() {

                ITConnect.user.register( $scope.user.mail, $scope.user.password,
                
                    function( data ) {

                        if ( data.done ) {
                            
                            $timeout(function(){
                            
                                $scope.user.newuser = false;

                                $scope.next();
                            });
                        }
                    } );
            }

            // User model
            $scope.user = {
                mail: '',
                password: '',
                password_c: '',
                cgu: false,
                newuser: true,
                connected: false
            };

            // Default step
            $scope.s = 1;
            $scope.wrpass = false;

            // Handle next
            $scope.next = function() {

                if (
                    $scope.s == 1 &&
                    $scope.user.mail
                ) {
                    // First Step, check email

                    login();

                } else if (
                    $scope.s == 2 &&
                    $scope.user.mail &&
                    $scope.user.password &&
                    (
                        $scope.user.newuser === false ||
                        $scope.user.password === $scope.user.password_c
                    )
                ) {
                    // Second Step, Check password, if user exist or user confirm his password

                    if ( $scope.user.newuser ) {
                        // If the user doesn't exist

                        register();

                    } else {
                        // If the user exist 

                        login();
                    }

                } else if (
                    $scope.s == 3 &&
                    $scope.user.mail &&
                    $scope.user.password &&
                    $scope.user.cgu
                ) {
                    // Check if user accept terms

                    login();
                }

            };

            // Handle previous
            $scope.previous = function() {

                if ( $scope.s > 1 ) {
                    // Go back in step

                    $scope.s--;
                }
            };

            if ( document.getElementById( 'login_email' ) ) {

                // Handle TAB from form
                document.getElementById( 'login_email' )
                    .onkeydown = function( e ) {
                        if ( e.keyCode == 9 ) {
                            return false;
                        }
                };
            }
    } ] );
