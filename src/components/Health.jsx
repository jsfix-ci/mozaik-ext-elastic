var React            = require('react');
var Reflux           = require('reflux');
var ApiConsumerMixin = require('mozaik/browser').Mixin.ApiConsumer;

var Health = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
    },

    getInitialState() {
        return {
            health: null,
            overall:{
                state: 0
            }
        };
    },

    getApiRequest() {
        return {
            id: 'elastic.cluster_health'
        };
    },

    onApiData(health) {
        this.setState({
            health: health.result.status,
            cluster_name: health.result.cluster_name,
            overall: {
                state: ['green', 'yellow', 'red'].indexOf(health.result.status)
            }
        });
    },

    render() {
        var titleNode = (
            <span>
                Elastic <span className="widget__header__subject">Health</span>
            </span>
        );

        return (
            <div class="elastic">
                <div className="widget__header">
                    { titleNode }
                    <i className="fa fa-eye" />
                </div>
                <div className="widget__body">
                    <h4>{ this.state.cluster_name }</h4>
                    { this.state.health }
                </div>
            </div>
        );
    },

    componentDidUpdate() {
        window.document.querySelector('.widget.elastic__health').setAttribute('data-state', this.state.overall.state);
    }
});

module.exports = Health;