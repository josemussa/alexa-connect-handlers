# Alexa Connect Handlers

Bind context and other arguments to your [alexa-sdk](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) handlers using a functional approach.

## Features

* Use pure functions as handlers.
* Pass extra arguments.
* Bind the context into the extra arguments.

## Install
```
npm i alexa-connect-handlers --save
```

## Usage

Wrap your handler using the Higher-Order function `connect` to bind the context to the first argument of the function, you can invoke [alexa-sdk](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) properties from here like `response`, `emit`, `attributes`, `t`, etc.

Pass as a second argument of connect an object with the properties that you want to pass to your handler, extra arguments will be available on the second argument of your function `({ emit }, { myExtraArgument })`.

You can pass a function as an extra argument and the context will be available on the arguments of the inner function, you can find and example of this below.

#### Basic
```JS
    import connect from 'alexa-connect-handlers';

    const AmazonNextIntent => ({ response, emit }) => {
        response.speak('Hello World');
        return emit(':responseReady');
    }

    export default connect(AmazonNextIntent)
```

#### With extra arguments
```JS
    import connect from 'alexa-connect-handlers';

    const AmazonNextIntent => ({ response, emit }, { foo }) => {
        response.speak(`Hello World my name is ${foo}`);
        return emit(':responseReady');
    }

    export default connect(AmazonNextIntent, { foo: 'bar' })
```

#### With functions as extra arguments
```JS
    import connect from 'alexa-connect-handlers';

    // Brings the context from the connected function
    // This is extremely useful for calling an instance of a class.
    const ymcaSpreader = () => ({ ymca }) => ymca.split('').join(' ');

    const AmazonNextIntent => ({ response, emit }, { ymca, ymcaSpreader }) => {
        response.speak(`It's fun to stay at the ${ymcaSpreader()}`);
        return emit(':responseReady');
    }

    export default connect(AmazonNextIntent, { ymca: 'ymca', ymcaSpreader })
```
