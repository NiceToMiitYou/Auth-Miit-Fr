"use strict";


angular
    .module( 'MiitAuth')
    .controller( 'ConnectionBarController', [
        '$scope', '$timeout',
        function( $scope, $timeout ) {
        
            $scope.isDisplay     = false;
            $scope.isAlert       = true;

            function hide( cb ) {

                $timeout( function() {
                    $scope.isAlert       = false;

                    $timeout( function() {
                        $scope.isDisplay     = false;

                        if( typeof cb === 'function' ) {

                            cb();
                        }
                    }, 3500 );
                } );
            }

            function show( ) {

                $timeout( function() {

                    $scope.isAlert   = true;

                    $scope.isDisplay = true;
                } );
            }

            // Fired upon a successful connection.
            function onConnect() {
                
            }

            // Fired upon a connection error.
            function onConnectError( error ) {

                show();
            }

            // Fired upon a connection timeout.
            function onConnectTimeout() {

                show();
            }

            // Fired upon a successful reconnection.
            function onReconnect( attempt ) {

                hide( function() {
                    // Try to reconnect
                    MiitConnect.user.login('try_connect', '', function( data ) {

                        if( !data || data && data.error === 'INVALID_MAIL_OR_DATA' ) {

                            window.location.reload();
                        }
                    } );
                } );
            }
            
            // Fired upon an attempt to reconnect.
            function onReconnectAttempt() {

                show();
            }

            // Fired upon an attempt to reconnect.
            function onReconnecting( attempt ) {

                show();
            }

            // Fired upon a reconnection attempt error.
            function onReconnectError( error ) {

                show();
            }

            // Fired when couldn’t reconnect within reconnectionAttempts
            function onReconnectFailed( attempt ) {

                show();
            }

            // Bind all events
            MiitConnect.listen( 'connect',           onConnect );
            MiitConnect.listen( 'connect_error',     onConnectError );
            MiitConnect.listen( 'connect_timeout',   onConnect );
            MiitConnect.listen( 'reconnect',         onReconnect );
            MiitConnect.listen( 'reconnect_attempt', onReconnectAttempt );
            MiitConnect.listen( 'reconnecting',      onReconnecting); 
            MiitConnect.listen( 'reconnect_error',   onReconnectError); 
            MiitConnect.listen( 'reconnect_failed',  onReconnectFailed); 
        }
    ] );