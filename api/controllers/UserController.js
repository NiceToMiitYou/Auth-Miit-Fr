

var redirectUrl = 'http://www.itevents.fr/';


module.exports = {

    /**
     * `UserController.index()`
     */
    index: function( req, res ) {

        var conferenceToken = req.param('token');

        if( !conferenceToken ) {

            return res.redirect( redirectUrl );
        } else {

            Conference
                .findOne( {
                    token: conferenceToken
                } )
                .exec( function( err, conference ) {
                    if( err || !conference ) {

                        return res.redirect( redirectUrl );
                    }

                    req.session.conference = conference;

                    return res.view( 'login', {
                        conference: conference
                    } );
                } );
        }
    },

    /**
     * `UserController.login()`
     */
    login: function( req, res ) {

        var mail     = req.param('mail'),
            password = req.param('password');

        if( mail &&
            req.session.conference &&
            req.session.conference.id ) {

            User
                .custom( {
                    method: 'postJson',
                    action: 'login',
                    data: {
                        conference: req.session.conference.id,
                        mail: mail,
                        password: password
                    }
                }, function( err, response ) {
                    if( err || !response ) {

                        return res.notDone({
                            error: 'ERROR_WHILE_LOGIN'
                        });
                    }

                    req.session.location = response.location;

                    return res.done( { 
                        exist: response.exist,
                        connected: response.connected
                    } );
                } );
        } else {

            return res.notDone({
                error: 'INVALID_MAIL_OR_CONFERENCE'
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
                        mail: mail,
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
    },

    /**
     * `UserController.redirect()`
     */
    redirect: function( req, res ) {

        if( req.session.conference &&
            req.session.location ) {

            return res.redirect( req.session.location );
        }

        return res.redirect( redirectUrl );
    }
};