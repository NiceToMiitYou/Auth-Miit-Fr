"use strict";

window.ITConnect = ( function() {

    return {

        // User actions
        user: {

            // Login action
            login: function( mail, password, connect, cb ) {
                io.socket.post( '/user/login', {
                    mail: mail,
                    password: password,
                    connect: connect
                }, cb );
            },

            // Login action
            register: function( mail, password, cb ) {
                io.socket.post( '/user/register', {
                    mail: mail,
                    password: password
                }, cb );
            }
        }
    };
} )();
