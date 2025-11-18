async function getBookerToken(request, baseURL) {
    const response = await request.post(`${baseURL}/auth`, {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });

    if (!response.ok()) {
        throw new Error(`Auth failed with status ${response.status()}`);
    }

    const body = await response.json();
    return body.token;
}

module.exports = {
    getBookerToken
};
