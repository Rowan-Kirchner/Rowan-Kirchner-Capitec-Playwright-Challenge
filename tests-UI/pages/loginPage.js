class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('input[name="user-name"]');
        this.passwordField = page.locator('input[name="password"]');
        this.submitButton = page.locator('input[type="submit"]');
        this.errorMessage = page.locator('.error-message-container');
    }

    async navigate() {
        await this.page.goto('/');
    }

    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.submitButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async isErrorVisible() {
        return await this.errorMessage.isVisible();
    }
}

module.exports = { LoginPage };