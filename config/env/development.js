/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    application: {

        services: {

            manager: {
                service: 'manager',
                url:     'http://127.0.0.1:2048/'
            }
        }
    },

    connections: {

        DwhWebService: {
            args: {
                accessToken: 'qVZDWicwFjh49O9PQUKJ8Ur8r3YKSrx3YqUll2L6'
            },
            protocol: 'http',
            host: 'localhost',
            port: 1337
        }
    },

    port: 4242
};
