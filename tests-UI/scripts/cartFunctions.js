
const { CartPage } = require('../pages/cartPage');

async function getCartItemCount(page) {
    const cartPage = new CartPage(page);
    return await cartPage.getCartItemCount();
}

async function getCartItemNames(page) {
    const cartPage = new CartPage(page);
    return await cartPage.getItemNames();
}

async function getCartItemPrices(page) {
    const cartPage = new CartPage(page);
    return await cartPage.getItemPrices();
}

async function removeItemFromCart(page) {
    const cartPage = new CartPage(page);
    await cartPage.removeItemByIndex(0);
}

async function removeItemFromCartByName(page, itemName) {
    const cartPage = new CartPage(page);
    await cartPage.removeItemByName(itemName);
}

async function checkout(page) {
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
}

async function continueShopping(page) {
    const cartPage = new CartPage(page);
    await cartPage.continueShopping();
}

async function isCartEmpty(page) {
    const count = await getCartItemCount(page);
    return count === 0;
}

module.exports = {
    getCartItemCount,
    getCartItemNames,
    getCartItemPrices,
    removeItemFromCart,
    removeItemFromCartByName,
    checkout,
    continueShopping,
    isCartEmpty
};