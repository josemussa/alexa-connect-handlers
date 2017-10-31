import connect from 'alexa-connect-handlers';

const LaunchRequest = ({ response, emit }) => {
    response.speak('Hello World');
    return emit(':responseReady');
};

export default connect(LaunchRequest);
