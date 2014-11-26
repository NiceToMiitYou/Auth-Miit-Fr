


module.exports = {
    
    index: function( req, res ) {

        var conferenceToken = req.param('token');

        if( !conferenceToken ) {

            return res.redirect('http://www.itevents.fr/');
        } else {

            Conference
                .findOne( {
                    token: conferenceToken
                } )
                .exec( function( err, conference ) {
                    if( err || !conference ) {
                        return res.forbidden();
                    }

                    return res.view( 'login', {
                        conference: conference
                    } );
                } );
        }
    }
};