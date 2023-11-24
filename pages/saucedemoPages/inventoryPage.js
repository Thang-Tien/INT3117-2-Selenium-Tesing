const { By, until } = require('selenium-webdriver');

class InventoryPage {
    constructor(driver) {
        this.driver = driver;

        // Inventory Page
        this.backpackATCButton = By.css("#add-to-cart-sauce-labs-backpack");
        this.bikeLightATCButton = By.css("#add-to-cart-sauce-labs-bike-light");
        this.boltTshirtATCButton = By.css("#add-to-cart-sauce-labs-bolt-t-shirt");
        this.fleeceJacketATCButton = By.css("#add-to-cart-sauce-labs-fleece-jacket");
        this.onesieATCButton = By.css("#add-to-cart-sauce-labs-onesie");
        this.alltheThingsATCButton = By.css("#add-to-cart-test.allthethings()-t-shirt-(red)");
        this.cartBadge = By.css(".shopping_cart_badge");
        this.cartButton = By.css(".shopping_cart_link");

        // Hamburger Sidebar Menu
        this.hamburgerMenu = By.css("#react-burger-menu-btn");
        this.hamburgerItemList = By.css(".bm-menu:nth-child(1) > nav.bm-item-list");
        this.allItemsLink = By.linkText("All Items");
        this.logoutLink = By.css("#logout_sidebar_link");
        this.resetAppStateLink = By.css("#reset_sidebar_link");
        this.shoppingCartIconFromHamburgerMenu = By.className('shopping_cart_link');

        // Checkout Page
        this.cartItem = By.css(".inventory_item_name");
        this.cartItem2 = By.id('item_1_title_link');
        this.cartItem3 = By.id('item_2_title_link');
        this.cartQuantity = By.css(".cart_quantity");
        this.continueShoppingButton = By.css("#continue-shopping");
        this.checkoutButton = By.css("#checkout");
        this.removeBackpackButton = By.css("#remove-sauce-labs-backpack");
        this.removeBikeLightButton = By.css("#remove-sauce-labs-bike-light");
        this.removeBoltTshirtButton = By.css("#remove-sauce-labs-bolt-t-shirt");
        this.removeFleeceJacketButton = By.css("#remove-sauce-labs-fleece-jacket");
        this.removeOnesieButton = By.css("#remove-sauce-labs-onesie");
        this.removeAlltheThingsButton = By.css("#remove-test.allthethings()-t-shirt-(red)");

        // Checkout Step One
        this.checkoutFirstName = By.css("#first-name");
        this.checkoutLastName = By.css("#last-name");
        this.checkoutZipCode = By.css("#postal-code");
        this.continueButton = By.css("#continue");
        this.cancelButton = By.css("#cancel");

        // Checkout Step Two
        this.finishOrderButton = By.css("#finish");
        this.itemTotal = By.className('summary_subtotal_label');              
        this.totalFirstItem = By.css(".cart_item:nth-child(3) div.cart_item_label div.item_pricebar:nth-child(3)")
        this.totalSecondItem = By.css(".cart_item:nth-child(4) div.cart_item_label > div.item_pricebar:nth-child(3)")
        this.totalThirdItem = By.css(".cart_item:nth-child(5) div.cart_item_label div.item_pricebar:nth-child(3)")
        this.taxAmount = By.className('summary_tax_label');
        this.totalForEverything = By.className('summary_info_label summary_total_label');
        this.cancelButton = By.css("#cancel")

        // Checkout Complete
        this.checkmarkImage = By.css(".pony_express");
        this.thankYouForYourOrderMessage = By.css(".complete-header");
        this.checkoutCompleteMessage = By.css(".title");
        this.backHomeButton = By.css("#back-to-products");
    }


    // INVENTORY PAGE - Main Page
    async clickAddToCartBackpack() {
        await this.driver.findElement(this.backpackATCButton).click();
    }

    async clickAddToCartBikeLight() {
        await this.driver.findElement(this.bikeLightATCButton).click();
    }

    async clickAddToCartBoltTshirt() {
        await this.driver.findElement(this.boltTshirtATCButton).click();
    }

    async clickAddToCartFleeceJacket() {
        await this.driver.findElement(this.fleeceJacketATCButton).click();
    }

    async addToCartOnesie() {
        await this.driver.findElement(this.onesieATCButton).click();
    }

    async clickAddToCartAlltheThings() {
        await this.driver.findElement(this.alltheThingsATCButton).click();
    }

    async clickCartBadge() {
        await this.driver.findElement(this.cartBadge).click();
    }

    async clickRemoveBackpack() {
        await this.driver.findElement(this.removeBackpackButton).click();
    }

    async clickRemoveBikeLight() {
        await this.driver.findElement(this.removeBikeLightButton).click();
    }

    async clickRemoveBoltTshirt() {
        await this.driver.findElement(this.removeBoltTshirtButton).click();
    }

    async clickRemoveFleeceJacket() {
        await this.driver.findElement(this.removeFleeceJacketButton).click();
    }

    async clickRemoveOnesie() {
        await this.driver.findElement(this.removeOnesieButton).click();
    }

    async clickRemoveAlltheThings() {
        await this.driver.findElement(this.removeAlltheThingsButton).click();
    }

    async clickCartButton() {
        await this.driver.findElement(this.cartButton).click();
    }

    // INVENTORY PAGE - Hamburger Menu

    async clickHamburgerMenu() {
        await this.driver.findElement(this.hamburgerMenu).click();
    }

    async clickAllItems() {
        const allItemsLink = await this.driver.findElement(this.allItemsLink);
        await allItemsLink.click();
    }

    async clickLogoutLink() {
        await this.driver.findElement(this.logoutLink).click();
    }

    async clickResetAppStateLink() {
        await this.driver.findElement(this.resetAppStateLink).click();
    }

    async cartBadgeVisible() {
        try {
            const cartBadge = await this.driver.findElement(this.cartBadge);
            return await cartBadge.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async hamburgerItemListVisible() {
        const theHamburgerItemList = await this.driver.findElement(this.hamburgerItemList); // find the element
        await this.driver.wait(until.elementIsVisible(theHamburgerItemList)); // wait for the element to be visible
        await this.driver.wait(until.elementIsEnabled(theHamburgerItemList)); // wait for the element to be enabled
        return true;
    }


    // INVENTORY PAGE - Cart and Checkout Step One

    async getCartBadgeText() {
        return await this.driver.findElement(this.cartBadge).getText();
    }

    async clickCartBadge() {
        await this.driver.findElement(this.cartBadge).click();
    }

    async cartInventoryItem() {
        return await this.driver.findElement(this.cartItem).getText();
    }

    async cartInventoryItem2() {
        return await this.driver.findElement(this.cartItem2).getText(); 
    }

    async cartInventoryItem3() {
        return await this.driver.findElement(this.cartItem3).getText();
    }

    async cartInventoryItemPrice() {
        return await this.driver.findElement(this.totalFirstItem).getText();
    }

    async cartInventoryItemPrice2() {
        return await this.driver.findElement(this.totalSecondItem).getText();
    }

    async cartInventoryItemPrice3() {
        return await this.driver.findElement(this.totalThirdItem).getText();
    }

    async clickRemoveButton() {
        await this.driver.findElement(this.removeButton).click();
    }

    async cartQuantity() {
        return await this.driver.findElement(this.cartQuantity).getText();
    }

    async cartInventoryItemVisible() {
        return await this.driver.findElement(this.cartItem).isDisplayed();
    }

    async clickContinueShoppingButton() {
        await this.driver.findElement(this.continueShoppingButton).click();
    }

    async clickCheckoutButton() {
        await this.driver.findElement(this.checkoutButton).click();
    }

    async clickContinueCheckoutButton() {
        await this.driver.findElement(this.continueButton).click();
    }

    async checkout(firstname, lastname, zipcode) {
        await this.driver.findElement(this.checkoutFirstName).sendKeys(firstname);
        await this.driver.findElement(this.checkoutLastName).sendKeys(lastname);
        await this.driver.findElement(this.checkoutZipCode).sendKeys(zipcode);
        await this.clickContinueCheckoutButton();
    }

    // INVENTORY PAGE - CHECKOUT
    async totalForItemsNoTax() {
        return await this.driver.findElement(this.itemTotal).getText();
    }

    async taxForAllItems() {
        return await this.driver.findElement(this.taxAmount).getText();
    }

    async totalPriceWithTaxes() {
        return await this.driver.findElement(this.totalForEverything).getText();
    }

    async clickFinishOrderButton() {
        await this.driver.findElement(this.finishOrderButton).click();
    }

    async totalFirstItemPrice() {
        return await this.driver.findElement(this.totalFirstItem).getText();
    }

    async totalSecondItemPrice() {
        return await this.driver.findElement(this.totalSecondItem).getText();
    }

    async totalThirdItemPrice() {
        return await this.driver.findElement(this.totalThirdItem).getText();
    }

    async totalTax() {
        return await this.driver.findElement(this.taxAmount).getText();
    }

    async totalFromItemTotal() {
        let total = await this.totalForItemsNoTax();
        total = total.substring(13, total.length);
        total = total * 1.00;
        return total.toFixed(2);
    }

    async totalForAllItemsWithoutTax() {
        let total = await Promise.all([
            this.totalFirstItemPrice(),
            this.totalSecondItemPrice(),
            this.totalThirdItemPrice()
        ]).then(prices => prices.reduce((acc, price) => acc + parseFloat(price.substring(1)), 0));
        
        return total.toFixed(2);
    }

    async totalForAllItemsWithTax() {
        // Get the prices for the items in parallel using Promise.all
        const prices = await Promise.all([
            this.totalFirstItemPrice(),
            this.totalSecondItemPrice().catch(() => ''),
            this.totalThirdItemPrice().catch(() => '')
        ]);
        // Filter out any empty prices and convert the remaining prices to numbers
        const validPrices = prices.filter(price => price !== '').map(price => parseFloat(price.substring(1)));
        // Sum the valid prices using reduce
        const total = validPrices.reduce((acc, price) => acc + price, 0);
        // Get the tax amount using the totalTax method, remove the "Tax: $" prefix, and convert to a number
        const taxAmount = parseFloat(await this.totalTax().then(tax => tax.substring(6)));
        // Add the total and tax amount, then round to 2 decimal places using toFixed
        return (total + taxAmount).toFixed(2);
    }



    //grab tax amount from page and then convert it into number form to 2 decimal places
    async taxAmountActual() {
        let taxAmount = await this.taxForAllItems();
        /* taxAmount is a string, so we need to convert it into a number
         by using substring to remove the first 6 char of the string, which are "Tax: $"
         then we convert it into a number by multiplying it by any number, in this case 1.00
         then convert it back to string from a number keeping 2 decimal places */
        taxAmount = taxAmount.substring(6, taxAmount.length);
        taxAmount = taxAmount * 1.00;
        return taxAmount.toFixed(2);
    }

    //calculate tax amount its 8 percent of totalOnlyBackpack, change it into number form to 2 decimal places
    async taxAmountExpectedUI() {
        let taxAmount = await this.totalForItemsNoTax()
        taxAmount = taxAmount.substring(13, taxAmount.length);
        taxAmount = taxAmount * .08;
        return taxAmount.toFixed(2);
    }

    async totalForBackpackWithoutTax() {
        let total = await this.totalForItemsNoTax();
        total = total.substring(13, total.length);
        return total;
    }

    async totalForBackpackWithTaxes() {
        let total = await this.totalForItemsNoTax();
        total = total.substring(13, total.length);
        let taxAmount = await this.taxForAllItems();
        taxAmount = taxAmount.substring(6, taxAmount.length);
        taxAmount = taxAmount * 1.00;
        total = total * 1.00;
        total = total + taxAmount;
        return total.toFixed(2);
    }

    async totalPriceWithTaxesUI() {
        let total = await this.totalPriceWithTaxes();
        total = total.substring(8, total.length);
        total = total * 1;
        return total.toFixed(2);

    }

    // INVENTORY PAGE - CHECKOUT COMPLETE
    async checkmarkVisible() {
        return await this.driver.findElement(this.checkmarkImage).isDisplayed();
    }

    async thankYouForOrderMessageText() {
        return await this.driver.findElement(this.thankYouForYourOrderMessage).getText();
    }

    async checkoutCompleteMessageText() {
        return await this.driver.findElement(this.checkoutCompleteMessage).getText();
    }

    async clickBackHomeButton() {
        await this.driver.findElement(this.backHomeButton).click();
    }

}

module.exports = InventoryPage;