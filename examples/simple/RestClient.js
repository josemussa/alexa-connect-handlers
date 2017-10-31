import axios from 'axios';

class RestClient {
    constructor(auth, params) {
        this.auth = auth;
        this.params = params;
    }

    isAuthenticated = () => !!this.auth;

    doRequest = (requestObject) => {
        if (!this.isAuthenticated()) {
            return Promise.reject(new Error('REQUEST_LOGIN'));
        }

        return axios({
            ...requestObject,
            headers: {
                Authorization: `${this.auth.tokeyType} ${this.auth.accessToken}`,
            },
        }).catch(error => Promise.reject(error));
    };

    get = options => this.doRequest({ ...options, method: 'GET' });
    post = options => this.doRequest({ ...options, method: 'POST' });
    patch = options => this.doRequest({ ...options, method: 'PATCH' });
    put = options => this.doRequest({ ...options, method: 'PUT' });
    delete = options => this.doRequest({ ...options, method: 'delete' });
}

export default RestClient;
