/* global describe, it, before */

import chai from 'chai';
import connect from '../lib/connectHandlers.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('connectHandlers', () => {
    before(() => {
        // lib = new Cat();
    });
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

    it('Should bind context to extra arguments', () => {
        const handler = ({ test }, { testToUppercase }) => testToUppercase();
        const extraArguments = { testToUppercase: () => ({ test }) => test.toUpperCase() };
        const context = {
            test: 'test',
            handler: connect(handler, extraArguments),
        };

        expect(context.handler()).to.equal('TEST');
    });
});
