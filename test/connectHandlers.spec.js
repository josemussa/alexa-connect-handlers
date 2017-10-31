/* global describe, it, before */

import chai from 'chai';
import connect, { mapToHandlers } from '../lib/connectHandlers';

const expect = chai.expect;

describe('createConnect', () => {
    it('Should return a function', () => {
        const handler = () => {};
        expect(connect(handler)).to.be.an.instanceof(Function);
    });

    it('Should bind context', () => {
        const handler = ({ test }) => test;
        const context = {
            test: 'test',
            handler: connect(handler),
        };

        expect(context.handler()).to.equal('test');
    });

    it('Should bind extra arguments', () => {
        const handler = ({ test }, { name, lastName }) => `${test} ${name}${lastName}`;
        const extraArguments = { name: 'connect', lastName: 'Handlers' };
        const context = {
            test: 'test',
            handler: connect(handler, extraArguments),
        };

        expect(context.handler()).to.equal('test connectHandlers');
    });

    it('Should bind context to extra arguments using a nested function', () => {
        const handler = ({ test }, { testToUppercase }) => testToUppercase();
        const extraArguments = { testToUppercase: () => ({ test }) => test.toUpperCase() };
        const context = {
            test: 'test',
            handler: connect(handler, extraArguments),
        };

        expect(context.handler()).to.equal('TEST');
    });

    it('Should bind context to extra arguments using a regular function', () => {
        const handler = ({ test }, { testToUppercase }) => testToUppercase('hello');
        const extraArguments = { testToUppercase: stringArgument => stringArgument.toUpperCase() };
        const context = {
            test: 'test',
            handler: connect(handler, extraArguments),
        };

        expect(context.handler()).to.equal('HELLO');
    });
});

describe('mapToHandlers', () => {
    it('Should return empty object when handlers are not specified', () => {
        expect(() => mapToHandlers()).to.throw(Error);
    });

    it('Should return empty object when handlers are not an object', () => {
        expect(() => mapToHandlers('test')).to.throw(Error);
    });

    it('Should return empty object when handlers are not an object', () => {
        expect(() => mapToHandlers('test')).to.throw(Error);
    });

    it('Should map properties to handlers', () => {
        const handler = ({ test }, { testToUppercase }) => testToUppercase(test);
        const extraArguments = { testToUppercase: stringArgument => stringArgument.toUpperCase() };
        const context = {
            handlers: mapToHandlers(
                {
                    handler: connect(handler, extraArguments),
                },
                {
                    test: 'test',
                },
            ),
        };

        expect(context.handlers.handler()).to.equal('TEST');
    });
});
