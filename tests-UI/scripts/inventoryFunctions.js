
const InventoryPage = require('../pages/inventoryPage');

async function openInventory(page) {
    await page.goto('/inventory.html');
}

async function getInventoryItemCount(page) {
    const inventoryPage = new InventoryPage(page);
    return await inventoryPage.inventoryItems.count();
}

async function sortByNameAsc(page) {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortDropdown.selectOption('az');   // A → Z
}

async function sortByNameDesc(page) {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortDropdown.selectOption('za');   // Z → A
}

async function sortByPriceLowToHigh(page) {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortDropdown.selectOption('lohi'); // Low → High
}

async function sortByPriceHighToLow(page) {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortDropdown.selectOption('hilo'); // High → Low
}

async function getAllItemNames(page) {
    const inventoryPage = new InventoryPage(page);
    const count = await inventoryPage.inventoryItems.count();
    const names = [];

    for (let i = 0; i < count; i++) {
        const text = await inventoryPage.itemName(i).textContent();
        names.push(text.trim());
    }

    return names;
}

async function getAllItemPrices(page) {
    const inventoryPage = new InventoryPage(page);
    const count = await inventoryPage.inventoryItems.count();
    const prices = [];

    for (let i = 0; i < count; i++) {
        const text = await inventoryPage.itemPrice(i).textContent();
        prices.push(parseFloat(text.replace('$', '')));
    }

    return prices;
}

async function getItemNameByIndex(page, index) {
    const inventoryPage = new InventoryPage(page);
    const text = await inventoryPage.itemName(index).textContent();
    return text.trim();
}

async function getItemPriceByIndex(page, index) {
    const inventoryPage = new InventoryPage(page);
    const text = await inventoryPage.itemPrice(index).textContent();
    return parseFloat(text.replace('$', ''));
}

async function addItemToCartByIndex(page, index) {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addButton(index).click();
}

async function removeItemFromCartByIndex(page, index) {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.removeButton(index).click();
}

async function isItemShowingRemoveButton(page, index) {
    const inventoryPage = new InventoryPage(page);
    return await inventoryPage.removeButton(index).isVisible();
}

async function openItemDetailsByIndex(page, index) {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.itemName(index).click();
}

async function clickCartIcon(page) {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.cartLink.click();
}

async function goToCart(page) {
    await clickCartIcon(page);
}

module.exports = {
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
};