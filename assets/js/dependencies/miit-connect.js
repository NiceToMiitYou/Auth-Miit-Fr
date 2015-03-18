"use strict";

window.MiitConnect = ( function() {

    return {

        // Listen
        listen: function( name, cb ) {
            // Bind the event
            io.socket.on( name, cb );
        },
        
        // User actions
        user: {

            // Login action
            login: function( mail, password, cb ) {
                io.socket.post( '/user/login', {
                    mail: mail,
                    password: password
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
