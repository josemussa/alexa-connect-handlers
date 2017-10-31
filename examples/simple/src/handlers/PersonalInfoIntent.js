import connect from 'alexa-connect-handlers';

const fetchPersonalInfo = () => ({ client }) =>
    client.get({
        url: 'https://my-api.com/personal/info',
    });

const PersonalInfoIntent = ({ response, emit }, { fetchPersonalInfo }) =>
    fetchPersonalInfo()
        .then(({ name }) => {
            response.speak(`Hello, your name is: ${name}`);
            return emit(':responseReady');
        })
        .catch(() => emit(':responseReady'));

export default connect(PersonalInfoIntent, { fetchPersonalInfo });
