import Alexa from 'alexa-sdk';
import { mapToHandlers } from 'alexa-connect-handlers';
import handlers from './handlers';
import RestClient from './RestClient';

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);

    const client = new RestClient({
        tokenType: 'Bearer',
        accessToken: '123',
    });

    alexa.registerHandlers(mapToHandlers(handlers, { client }));
    alexa.execute();
};
