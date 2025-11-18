class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.sortDropdown = page.locator('select');
        this.cartLink = page.locator('.shopping_cart_link');
    }

     itemName(index) {
        return this.inventoryItems.nth(index).locator('.inventory_item_name');
    }

    itemPrice(index) {
        return this.inventoryItems.nth(index).locator('.inventory_item_price');
    }

    addButton(index) {
        return this.inventoryItems.nth(index).getByRole('button', { name: 'Add to cart' });
    }

    removeButton(index) {
        return this.inventoryItems.nth(index).getByRole('button', { name: 'Remove' });
    }
}

module.exports = InventoryPage;
