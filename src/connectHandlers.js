import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import mapValues from 'lodash/mapValues';

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

const mapExtraArguments = (extraArguments, context) =>
    (isObject(extraArguments)
        ? mapValues(extraArguments, value => handleExtraArguments(value, context))
        : {});

export default function createConnect(handler, props) {
    return function connect() {
        const context = this;
        const args = mapValues(context, value => (isFunction(value) ? value.bind(context) : value));

        return handler(args, mapExtraArguments(props, this));
    };
}
