
var redirectUrl = 'http://miit.events/';

module.exports = {

    /**
     * `RouterController.index()`
     */
    index: function( req, res ) {

        if ( req.session.data &&
             req.session.data.conference &&
             req.session.data.conference.token ) {

            return res.redirect( '/' + req.session.data.conference.token );
        }

        return res.redirect( redirectUrl );
    },

    /**
     * `RouterController.service()`
     */
    service: function( req, res ) {

        var serviceToken = req.param('service');

        if( serviceToken && sails.config.application.services[serviceToken] ) {

            // Store data
            req.session.data = sails.config.application.services[serviceToken];

            // Render login page
            return res.view( 'login', {
                logo:         '/images/logodark.png',
                mail:         req.session.mail || '',
                informations: {
                    name:        req.session.data.name,
                    description: req.__( 'services.' + req.session.data.service )
                }
            } );
        } else {
            
            return res.redirect( redirectUrl );
        }
    },

    /**
     * `RouterController.conference()`
     */
    conference: function( req, res ) {

        var conferenceToken = req.param('token');

        if( conferenceToken ) {

            Conference
                .findOne( {
                    token:    conferenceToken,
                    exported: false
                } )
                .exec( function( err, conference ) {
                    if( err || !conference ) {

                        return res.redirect( redirectUrl );
                    }

                    // Store data
                    req.session.data = { 
                        conference: conference
                    };

                    return res.view( 'login', {
                        logo:         conference.logo,
                        mail:         req.session.mail || '',
                        informations: conference
                    } );
                } );

        } else {
            
            return res.redirect( redirectUrl );
        }
    },

    /**
     * `RouterController.redirect()`
     */
    redirect: function( req, res ) {

        if( req.session.location ) {

            return res.redirect( req.session.location );
        }

        return res.redirect( redirectUrl );
    }
};