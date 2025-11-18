
class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.firstNameField = page.locator('[data-test="firstName"]');
        this.lastNameField = page.locator('[data-test="lastName"]');
        this.postalCodeField = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');

        this.finishButton = page.locator('[data-test="finish"]');

        this.completeHeader = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');
    }

    async fillInformation(firstName, lastName, postalCode) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);
    }

    async continue() {
        await this.continueButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    async finish() {
        await this.finishButton.click();
    }


    async getCompleteHeader() {
        return await this.completeHeader.textContent();
    }

    async getCompleteText() {
        return await this.completeText.textContent();
    }
    
}

module.exports = { CheckoutPage };