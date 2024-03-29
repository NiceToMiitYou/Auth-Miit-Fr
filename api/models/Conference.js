/**
 * Conference.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true
        },

        logo: {
            type: 'text',
            required: true
        },

        url: {
            type: 'string',
            required: true
        },

        token: {
            type: 'string',
            required: true
        },

        description: {
            type: 'text'
        }
    }
};
