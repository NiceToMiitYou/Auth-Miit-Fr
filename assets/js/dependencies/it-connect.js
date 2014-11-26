"use strict";

window.ITConnect = ( function() {
    var apiPrefix = '/api/';

    return {

        // User actions
        user: {

            // Login action
            login: function( mail, password, connect, cb ) {
                io.socket.post( apiPrefix + '/api/user/login', {
                    mail: mail,
                    password: password,
                    connect: connect
                }, cb );
            },

            // Login action
            register: function( mail, password, cb ) {
                io.socket.post( apiPrefix + '/user/register', {
                    mail: mail,
                    password: password
                }, cb );
            }
        }
    };
} )();
