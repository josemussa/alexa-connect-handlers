import mapValues from 'lodash.mapvalues';
import isFunction from 'lodash.isfunction';
import isObject from 'lodash.isobject';

export function mapToHandlers(handlers, properties = {}) {
    if (!isObject(handlers)) {
        throw new Error('Handlers should be an object');
    }

    return mapValues(handlers, (handler) => {
        if (!isFunction(handler)) {
            throw new Error('Handler should be a function');
        }

        if (!isObject(properties)) {
            throw new Error('Properties should be an object');
        }

        return function () {
            return handler.call(Object.assign({}, this, properties));
        };
    });
}

const handleExtraArguments = (value, context) => {
    if (isFunction(value)) {
        return (params) => {
            const result = value(params);
            if (isFunction(result)) {
                return result(context);
            }
            return result;
        };
    }

    return value;
};

const mapExtraArguments = (extraArguments, context) => {
    if (!isObject(extraArguments)) {
        throw new Error('extraArguments should be an object');
    }

    return mapValues(extraArguments, value => handleExtraArguments(value, context));
};

export default function createConnect(handler, properties) {
    return function connect() {
        const context = this;
        const args = mapValues(context, value => (isFunction(value) ? value.bind(context) : value));

        return handler(args, properties ? mapExtraArguments(properties, this) : {});
    };
}
