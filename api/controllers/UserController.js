
module.exports = {

    /**
     * `UserController.login()`
     */
    login: function( req, res ) {

        var mail     = req.param('mail'),
            password = req.param('password');

        if( mail &&
            req.session.data ) {

            User
                .custom( {
                    method: 'postJson',
                    action: 'login',
                    data: {
                        data:     req.session.data,
                        mail:     mail,
                        password: password
                    }
                }, function( err, response ) {
                    if( err || !response ) {

                        return res.notDone({
                            error: 'ERROR_WHILE_LOGIN'
                        });
                    }

                    if( response.exist &&
                        response.connected) {

                        req.session.mail     = mail;
                    }

                    req.session.location = response.location;

                    // Save the session and send the response
                    req.session.save( function( errSession ) {
                        
                        return res.done( { 
                            exist:     response.exist,
                            connected: response.connected
                        } );
                    } );
                } );
        } else {

            return res.notDone({
                error: 'INVALID_MAIL_OR_DATA'
            });
        }
    },

    /**
     * `UserController.register()`
     */
    register: function( req, res ) {

        var mail     = req.param('mail'),
            password = req.param('password');

        if( mail && password ) {

            User
                .custom( {
                    method: 'postJson',
                    action: 'register',
                    data: {
                        mail:     mail,
                        password: password
                    }
                }, function( err, response ) {
                    if( err || !response ) {

                        return res.notDone();
                    }

                    return res.done( response );
                } );
        } else {

            return res.notDone();
        }
    }
};