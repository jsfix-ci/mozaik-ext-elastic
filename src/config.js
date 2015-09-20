var convict = require('convict');

var config = convict({
    bamboo: {
        baseUrl: {
            doc:     'The publicly available elastic search API URL.',
            default: null,
            format:  String,
            env:    'ELASTIC_API_BASE_URL'
        }
    }
});

module.exports = config;