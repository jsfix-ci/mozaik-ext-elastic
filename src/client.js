var request        = require('superagent');
var config         = require('./config');
var Promise        = require('bluebird');
var chalk          = require('chalk');
require('superagent-bluebird-promise');

/**
 * @param {Mozaik} mozaik
 */
var client = function (mozaik) {

    mozaik.loadApiConfig(config);

    function buildRequest(path) {
        var url = config.get('elastic.baseUrl') + path;

        mozaik.logger.info(chalk.yellow(`[elastic] fetching from ${ url }`));

        return request.get(url)
            .promise()
            .catch((reason)=>{
                mozaik.logger.error(chalk.red(`[elastic] request failed: ${JSON.stringify(reason)}`));
            });
    }

    function getClusterHealth(health){
        return health;
    }

    return {
        cluster_health(parameters) {
            var request = buildRequest('/_cluster/health');

            return request.then((response)=>{
               return {
                    result: getClusterHealth(response.body)
                    , baseUrl: config.get('elastic.baseUrl')
                };
            }).catch((reason)=>{
                mozaik.logger.error(chalk.red(`[elastic] health failed: ${JSON.stringify(reason)}`));
            });
        }
    };
};

module.exports = client;