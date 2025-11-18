const { LoginPage } = require('../pages/loginPage');

async function loginAs(page, username, password) {
    const loginPage = new LoginPage(page); 
    await loginPage.navigate();
    await loginPage.login(username, password);
}

async function verifyLoginError(page) {
    const loginPage = new LoginPage(page); 
    return await loginPage.isErrorVisible();
}

module.exports = { loginAs, verifyLoginError };