/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    connections: {

        DwhWebService: {
            args: {
                accessToken: 'qVZDWicwFjh49O9PQUKJ8Ur8r3YKSrx3YqUll2L6'
            },
            protocol: 'http',
            host: 'dwh.miit.fr',
            port: 80
        }
    },

    grunt: {
        _hookTimeout: 1000000
    },

    session: {
        adapter: 'redis',
        host:    'miit-fr-001.xidhqo.0001.euc1.cache.amazonaws.com',
        port:     6379,
        prefix:  'sess:',
        db:      'auth-miit-fr'
    },

    sockets: {
        _hookTimeout:  1000000,
        adapter:      'socket.io-redis',
        host:         'miit-fr-001.xidhqo.0001.euc1.cache.amazonaws.com',
        port:          6379,
        prefix:       'sock:',
        db:           'auth-miit-fr'
    },

    port: 80,
    
    log: {
       level: 'silent'
    }
};
