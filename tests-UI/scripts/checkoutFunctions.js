
const { CheckoutPage } = require('../pages/checkoutPage');

async function fillCheckoutInformation(page, firstName, lastName, postalCode) {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillInformation(firstName, lastName, postalCode);
}

async function continueCheckout(page) {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.continue();
}

async function finishCheckout(page) {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.finish();
}

async function completeCheckout(page, firstName, lastName, postalCode) {
    await fillCheckoutInformation(page, firstName, lastName, postalCode);
    await continueCheckout(page);
    await finishCheckout(page);
}

async function getCheckoutConfirmationMessage(page) {
    const checkoutPage = new CheckoutPage(page);
    const header = await checkoutPage.getCompleteHeader();
    const text = await checkoutPage.getCompleteText();
    return { header, text };
}

module.exports = {
    completeCheckout,
    getCheckoutConfirmationMessage,
};