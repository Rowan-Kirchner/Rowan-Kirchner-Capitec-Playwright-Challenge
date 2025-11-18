class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.cartItemName = page.locator('.inventory_item_name');
        this.cartItemPrice = page.locator('.inventory_item_price');
        this.removeButtons = page.locator('button[id^="remove"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }
    async getCartItemCount() {
        return await this.cartItems.count();
    }

    async removeItemByIndex(index = 0) {
        await this.removeButtons.nth(index).click();
    }

    async removeItemByName(itemName) {
        const dataTestId = `remove-${itemName.toLowerCase().replace(/\s+/g, '-')}`;
        await this.page.locator(`[data-test="${dataTestId}"]`).click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async getItemNames() {
        return await this.cartItemName.allTextContents();
    }

    async getItemPrices() {
        const prices = await this.cartItemPrice.allTextContents();
        return prices.map(p => parseFloat(p.replace('$', '')));
    }
}

module.exports = { CartPage };