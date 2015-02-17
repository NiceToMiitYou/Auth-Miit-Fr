"use strict";

if (typeof window.console === "undefined" || typeof window.console.log === "undefined") {

    window.console = {};
    window.console.log = function() {};
}

MiitAuth.controller(
    'LoginController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.request_send = false;

            // Reset the request
            function request_end() {

                $timeout(function(){
                
                    $scope.request_send = false;
                });
            }

            function check_exist_register() {

                if( !$scope.request_send ) {

                    $scope.request_send = true;

                    // Try to login to know if exist
                    MiitConnect.user.login( $scope.user.mail, '',
                        
                        function( data ) {

                            if( data.done ) {

                                $timeout(function() {
                                    
                                    $scope.request_send = false;

                                    // User already exist
                                    if( data.exist ) {

                                        $scope.user.exist = true;
                                    } else {

                                        register();
                                    }
                                } );    
                            } else {

                                request_end();
                            }
                        } );
                }
            }

            function login() {

                if( !$scope.request_send ) {

                    $scope.request_send = true;

                    // Try to login
                    MiitConnect.user.login( $scope.user.mail, $scope.user.password,
                        
                        function( data ) {
                            
                            if( data.done ) {
                            
                                $timeout(function() {
                                    
                                    if ( !data.exist || !data.connected ) {

                                        $scope.user.wrong = true;
                                    }

                                    // If connected, redirect
                                    else if ( data.connected ) {

                                        window.location.pathname = '/redirect';

                                        return;
                                    }

                                    $scope.request_send = false;
                                } );    
                            } else {

                                request_end();
                            }
                        } );
                }
            }

            function register() {

                if( !$scope.request_send ) {

                    $scope.request_send = true;

                    MiitConnect.user.register( $scope.user.mail, $scope.user.password,
                    
                        function( data ) {

                            if ( data.done ) {
                                
                                $timeout(function(){

                                    $scope.request_send = false;
                                
                                    login();
                                });
                            } else {
                            
                                request_end();
                            }
                        } );
                }
            }

            // User model
            $scope.user = {
                mail: '',
                password: '',
                confirm: '',
                need_account: false,
                exist: false,
                wrong: false
            };

            function disabled() {

                var disabled = false;

                if(  $scope.request_send || // Already a request in progress
                    !$scope.cgu || // No CGU checked
                    !$scope.user.mail || // No mail
                     $scope.user.wrong || // Password wrong
                     ( 
                        $scope.user.password &&
                        $scope.user.password.length < 6
                    ) || // Password length
                    ( // Password not confirmed
                        $scope.user.need_account &&
                        $scope.user.password !== $scope.user.confirm
                    ) ||
                    ( // Account already exist
                        $scope.user.need_account &&
                        $scope.user.exist
                    )
                ) {
                    
                    disabled = true;
                }

                return disabled;
            }

            $scope.processed = function() {
                
                // If not in progress and not disabled
                if( !$scope.request_send && !disabled() ) {
                    
                    // If need account => register, else => login
                    if( $scope.user.need_account ) {

                        check_exist_register();
                    } else {

                        login();
                    }
                }
            };

            // Reset all prerequist
            $scope.reset = function() {

                $scope.user.exist = false;
                $scope.user.wrong = false;
            };

            $scope.disabled = disabled;
    } ] );
