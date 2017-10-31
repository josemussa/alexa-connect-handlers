import 'babel-polyfill';
import Alexa from 'alexa-sdk';
import handlers from './handlers';
import RestClient from './RestClient';
import mapValues from 'lodash/mapValues';

function mapToHandlers(handlers, properties) {
    if (!handlers) {
        return {};
    }

    return mapValues(handlers, handler => handler.call({ ...this, ...properties }));
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);

    const client = new RestClient({
        tokenType: 'Bearer',
        accessToken: '123',
    });

    alexa.registerHandlers(mapToHandlers(handlers, { client }));
    alexa.execute();
};
