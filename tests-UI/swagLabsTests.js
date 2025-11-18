
const { test, expect, describe } = require('@playwright/test');
const { loginAs, verifyLoginError } = require('./scripts/loginFunctions');
const {
    openInventory,
    getInventoryItemCount,
    sortByNameAsc,
    sortByNameDesc,
    sortByPriceLowToHigh,
    sortByPriceHighToLow,
    getAllItemNames,
    getAllItemPrices,
    getItemNameByIndex,
    getItemPriceByIndex,
    addItemToCartByIndex,
    removeItemFromCartByIndex,
    isItemShowingRemoveButton,
    openItemDetailsByIndex,
    clickCartIcon,
    goToCart
} = require('./scripts/inventoryFunctions');
const {
    getCartItemCount,
    getCartItemNames,
    getCartItemPrices,
    removeItemFromCart,
    checkout,
    continueShopping,
    isCartEmpty
} = require('./scripts/cartFunctions');
const { completeCheckout, getCheckoutConfirmationMessage } = require('./scripts/checkoutFunctions');
const users = require('../data/ui-users.json');

describe('Login Tests', () => {
    test('Login: standard user', async ({ page }) => {
        await loginAs(page, users.standard_user.username, users.standard_user.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Login: locked-out user', async ({ page }) => {
        await loginAs(page, users.locked_out_user.username, users.locked_out_user.password);
        await expect(await verifyLoginError(page)).toBeTruthy();
    });

    test('Login: problem user', async ({ page }) => {
        await loginAs(page, users.problem_user.username, users.problem_user.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Login: performance glitch user', async ({ page }) => {
        await loginAs(page, users.performance_glitch_user.username, users.performance_glitch_user.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Login: error user', async ({ page }) => {
        await loginAs(page, users.error_user.username, users.error_user.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Login: visual user', async ({ page }) => {
        await loginAs(page, users.visual_user.username, users.visual_user.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});

describe('Inventory Tests', () => {
    test.beforeEach(async ({ page }) => {
        await loginAs(page, users.standard_user.username, users.standard_user.password);
    });

    test('Inventory page displays products', async ({ page }) => {
        await openInventory(page);
        const itemCount = await getInventoryItemCount(page);
        await expect(itemCount).toBeGreaterThan(0);
    });

    test('Sort items by name A to Z', async ({ page }) => {
        await openInventory(page);
        await sortByNameAsc(page);

        const actualNames = await getAllItemNames(page);
        const expectedNames = [...actualNames].sort((a, b) => a.localeCompare(b));

        expect(actualNames).toEqual(expectedNames);
    });

    test('Sort items by name Z to A', async ({ page }) => {
        await openInventory(page);
        await sortByNameDesc(page);

        const actualNames = await getAllItemNames(page);
        const expectedNames = [...actualNames].sort((a, b) => b.localeCompare(a));

        expect(actualNames).toEqual(expectedNames);
    });

    test('Sort items by price Low to High', async ({ page }) => {
        await openInventory(page);
        await sortByPriceLowToHigh(page);

        const actualPrices = await getAllItemPrices(page);
        const expectedPrices = [...actualPrices].sort((a, b) => a - b);

        expect(actualPrices).toEqual(expectedPrices);
    });

    test('Sort items by price High to Low', async ({ page }) => {
        await openInventory(page);
        await sortByPriceHighToLow(page);

        const actualPrices = await getAllItemPrices(page);
        const expectedPrices = [...actualPrices].sort((a, b) => b - a);

        expect(actualPrices).toEqual(expectedPrices);
    });

    test('Add and remove first item from cart from inventory page', async ({ page }) => {
        await openInventory(page);

        await addItemToCartByIndex(page, 0);
        const hasRemoveButtonAfterAdd = await isItemShowingRemoveButton(page, 0);
        expect(hasRemoveButtonAfterAdd).toBe(true);

        await removeItemFromCartByIndex(page, 0);
        const hasRemoveButtonAfterRemove = await isItemShowingRemoveButton(page, 0);
        expect(hasRemoveButtonAfterRemove).toBe(false);
    });

    test('Clicking first item name opens item details page', async ({ page }) => {
        await openInventory(page);
        await openItemDetailsByIndex(page, 0);

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
    });

    test('Clicking cart icon navigates to cart page', async ({ page }) => {
        await openInventory(page);
        await clickCartIcon(page);

        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });
});

describe('Cart Tests', () => {
    test.beforeEach(async ({ page }) => {
        await loginAs(page, users.standard_user.username, users.standard_user.password);
    });

    test('Add single item to cart and view cart', async ({ page }) => {
        await openInventory(page);
        await addItemToCartByIndex(page, 0);
        await goToCart(page);

        const cartItemCount = await getCartItemCount(page);
        await expect(cartItemCount).toBe(1);
    });

    test('Add multiple items to cart and verify all items appear', async ({ page }) => {
        await openInventory(page);

        const expectedItems = [];
        for (let i = 0; i < 3; i++) {
            const name = await getItemNameByIndex(page, i);
            const price = await getItemPriceByIndex(page, i);
            expectedItems.push({ name, price });
            await addItemToCartByIndex(page, i);
        }

        await goToCart(page);

        const cartItemCount = await getCartItemCount(page);
        expect(cartItemCount).toBe(3);

        const cartItemNames = await getCartItemNames(page);
        const cartItemPrices = await getCartItemPrices(page);

        expectedItems.forEach((expectedItem) => {
            expect(cartItemNames).toContain(expectedItem.name);
            expect(cartItemPrices).toContain(expectedItem.price);
        });
    });

    test('Remove single item from cart', async ({ page }) => {
        await openInventory(page);
        await addItemToCartByIndex(page, 0);
        await goToCart(page);

        await removeItemFromCart(page);

        const cartItemCount = await getCartItemCount(page);
        await expect(cartItemCount).toBe(0);

        const isEmpty = await isCartEmpty(page);
        expect(isEmpty).toBe(true);
    });

    test('Remove all items from cart', async ({ page }) => {
        await openInventory(page);

        await addItemToCartByIndex(page, 0);
        await addItemToCartByIndex(page, 1);
        await addItemToCartByIndex(page, 2);

        await goToCart(page);

        let cartItemCount = await getCartItemCount(page);
        expect(cartItemCount).toBe(3);

        await removeItemFromCart(page);
        cartItemCount = await getCartItemCount(page);
        expect(cartItemCount).toBe(2);

        await removeItemFromCart(page);
        cartItemCount = await getCartItemCount(page);
        expect(cartItemCount).toBe(1);

        await removeItemFromCart(page);
        cartItemCount = await getCartItemCount(page);
        expect(cartItemCount).toBe(0);

        const isEmpty = await isCartEmpty(page);
        expect(isEmpty).toBe(true);
    });

    test('Continue shopping from cart', async ({ page }) => {
        await openInventory(page);

        await addItemToCartByIndex(page, 0);
        await goToCart(page);

        await continueShopping(page);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Add items, continue shopping, add more items', async ({ page }) => {
        await openInventory(page);

        const item1Name = await getItemNameByIndex(page, 0);
        const item2Name = await getItemNameByIndex(page, 1);
        await addItemToCartByIndex(page, 0);
        await addItemToCartByIndex(page, 1);

        await goToCart(page);
        let cartItemCount = await getCartItemCount(page);
        expect(cartItemCount).toBe(2);

        await continueShopping(page);

        const item3Name = await getItemNameByIndex(page, 2);
        await addItemToCartByIndex(page, 2);

        await goToCart(page);

        cartItemCount = await getCartItemCount(page);
        expect(cartItemCount).toBe(3);

        const cartItemNames = await getCartItemNames(page);
        expect(cartItemNames).toContain(item1Name);
        expect(cartItemNames).toContain(item2Name);
        expect(cartItemNames).toContain(item3Name);
    });
});

describe('Checkout Tests', () => {
    test.beforeEach(async ({ page }) => {
        await loginAs(page, users.standard_user.username, users.standard_user.password);
    });

    test('Checkout completes successfully with single item', async ({ page }) => {
        await openInventory(page);
        await addItemToCartByIndex(page, 0);
        await goToCart(page);
        await checkout(page);

        await completeCheckout(page, 'John', 'Doe', '12345');

        const confirmation = await getCheckoutConfirmationMessage(page);
        expect(confirmation.header).toContain('Thank you for your order');
    });

    test('Checkout completes successfully with multiple items', async ({ page }) => {
        await openInventory(page);

        await addItemToCartByIndex(page, 0);
        await addItemToCartByIndex(page, 1);
        await addItemToCartByIndex(page, 2);

        await goToCart(page);

        const cartItemCount = await getCartItemCount(page);
        expect(cartItemCount).toBe(3);

        await checkout(page);
        await completeCheckout(page, 'John', 'Doe', '12345');

        const confirmation = await getCheckoutConfirmationMessage(page);
        expect(confirmation.header).toContain('Thank you for your order');
    });
});