import { isFunction, isObject, mapValues } from 'lodash';

const mapExtraArguments = (extraArguments, context) =>
    (isObject(extraArguments)
        ? mapValues(
            extraArguments,
            value => (isFunction(value) ? params => value(params)(context) : value),
        )
        : {});

export default function createConnect(handler, props) {
    return function connect() {
        const context = this;
        const args = mapValues(context, value => (isFunction(value) ? value.bind(context) : value));

        return handler(args, mapExtraArguments(props, this));
    };
}
