class RestClient {
    constructor(auth, params) {
        this.auth = auth;
        this.params = params;
    }

    isAuthenticated = () => !!this.auth;

    doRequest = () => {
        if (!this.isAuthenticated()) {
            return Promise.reject(new Error('REQUEST_LOGIN'));
        }

        // Simulate request
        return new Promise((resolve) => {
            setTimeout(() => resolve({
                name: 'Test User',
            }), 1000);
        });
    };

    get = options => this.doRequest({ ...options, method: 'GET' });
}

export default RestClient;
