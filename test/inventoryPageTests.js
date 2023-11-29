const { Builder, By, Key, until, } = require('selenium-webdriver');
const { describe, it, after, before } = require('mocha');
const assert = require('chai').assert;
const LoginPage = require('../pages/saucedemoPages/loginPage');
const { expect } = require('chai');
const InventoryPage = require('../pages/saucedemoPages/inventoryPage');
const log4js = require('log4js');
const logger = log4js.getLogger('inventoryPageTests');

logger.level = 'info';

let driver;
let loginPage;
let inventoryPage;

log4js.configure({
    appenders: {
        file: { type: 'file', filename: 'logs/inventoryPageTestsLog.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'info' }
    }
});

logger.info('inventoryPageTests Started');

before(async () => {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
});

after(() => {
    if (driver) {
        return driver.quit().catch((error) => {
            logger.error(`Error closing driver: ${error.message}`);
        });
    }
});

describe('Test#1 - Sample Test on saucedemo.com functionality', () => {
    before(async () => {
        await driver.get('https://www.saucedemo.com/');
    });

    // Test#1- Load Inventory Page
    it('Test#1 - Open inventory page and url should be correct', async () => {

        // login
        await loginPage.justLogin();
    
        // verify that the user is redirected to the inventory page w/succesful login
        const currentURL = await driver.getCurrentUrl();
        const expectedURL = 'https://www.saucedemo.com/inventory.html';
        expect(currentURL).to.equal(expectedURL);
        if (currentURL !== expectedURL) {
            logger.error(`Test#1 - FAILED: Expected cart badge text: Expected URL:${expectedURL} does not match Current URL: ${currentURL}`);
        } else {
            logger.info(`Test#1 - PASSED`);
        }
    });

    it('Test#2 - Verify adding item to cart and then verify removing it', async () => {
        let failCounter = 0;
    
        // add backpack item to cart
        await inventoryPage.clickAddToCartBackpack();
        
        // verify that the item was added to the cart
        const cartBadge = await inventoryPage.getCartBadgeText();
        const cartBadgeExpected = '1';
        try {
            expect(cartBadge).to.equal(cartBadgeExpected);
        } catch (error) {
            logger.error(`Test#2 - FAILED: Expected cart badge text: ${cartBadgeExpected}, Actual cart badge text: ${cartBadge}`);
            failCounter++;
        }
        
        await inventoryPage.clickCartBadge();
        
        // verify that the user is redirected to the cart page
        const currentURL = await driver.getCurrentUrl();
        const expectedURL = 'https://www.saucedemo.com/cart.html';
        try {
            expect(currentURL).to.equal(expectedURL);
        } catch (error) {
            logger.error(`Test#2 - FAILED: Expected URL:${expectedURL} does not match Current URL: ${currentURL}`);
            failCounter++;
        }
        
        // verify that the backpack was added to the cart
        const cartItem = await inventoryPage.cartInventoryItem();
        const cartItemExpected = 'Sauce Labs Backpack';
        try {
            expect(cartItem).to.equal(cartItemExpected);
        } catch (error) {
            logger.error(`Test#2 - FAILED: Expected cart item: ${cartItemExpected}, Actual cart item: ${cartItem}`);
            failCounter++;
        }
        
        // remove backpack item from cart
        await inventoryPage.clickRemoveBackpack();
        
        // Check if the cart item is still visible on the page.
        let cartItemVisible = false;
        try {
            cartItemVisible = await inventoryPage.cartInventoryItemVisible();
        } catch (error) {
            if (error.name !== 'NoSuchElementError') {
                throw error;
            }
        }
        
        /* If the cart item is not visible, the test passes. If the cart item 
        is still visible, the test fails. */
        try {
            expect(cartItemVisible).to.equal(false);
        } catch (error) {
            logger.error(`Test#2 - FAILED: Expected cart item to be removed from cart, Actual cart item is still visible`);
            allExpectsPassed = false;
            failCounter++;
        }
    
        // if all tests steps passed then Test itself passed saying if its true then test passed
        if (failCounter === 0) {
            logger.info(`Test#2 - PASSED`);
        } else {
            logger.error(`Test#2 - FAILED: ${failCounter} test steps failed.`);
        }
        
    
    });
    
    // Test#3- Add Item to Cart and then buy it
    it('Test#3 - Verify adding item to cart and then verify buying it', async () => {
        let failCounter = 0;

        // click on continue shopping button
        await inventoryPage.clickContinueShoppingButton();

        // add backpack item and proceed to cart and click checkout
        await inventoryPage.clickAddToCartBackpack();
        await inventoryPage.clickCartBadge();
        await inventoryPage.clickCheckoutButton();

        // verify that the user is redirected to the checkout page
        const currentURL = await driver.getCurrentUrl();
        const expectedURL = 'https://www.saucedemo.com/checkout-step-one.html';

        try {
            expect(currentURL).to.equal(expectedURL);
        } catch (error) {
            logger.error(`FAILED: Step 1 Checkout Expected URL:${expectedURL} does not match Current URL: ${currentURL}`);
            failCounter++; 
        }

        // checkout with premade user info and then verify user is in checkout overview
        await inventoryPage.checkout("Thắng", "Tiến", "12345");
        const currentURL2 = await driver.getCurrentUrl();
        const expectedURL2 = 'https://www.saucedemo.com/checkout-step-two.html';

        // use the try catch method for logging
        try {
            expect(currentURL2).to.equal(expectedURL2);
        } catch (error) {
            logger.error(`FAILED: Step 2 Checkout Expected URL:${expectedURL2} does not match Current URL: ${currentURL2}`);
            failCounter++;
        }

        // Once again check that user is only buying backpack and pricing is correct
        const total = await inventoryPage.totalForItemsNoTax();
        const totalExpected = ('Item total: $29.99');
        try {
        expect(total).to.equal(totalExpected);
        } catch (error) {
            logger.error(`FAILED: Backpack Expected total:${totalExpected} does not match Actual total: ${total}`);
            failCounter++;
        }

        // make sure taxAmountActual number from that function matches taxAmountExpected number from that function
        const taxAmountActual = await inventoryPage.taxAmountActual();
        const taxAmountExpected = await inventoryPage.taxAmountExpectedUI();

        try {
            expect(taxAmountActual).to.equal(taxAmountExpected);
        } catch (error) {
            logger.error(`FAILED: Tax Amount Expected:${taxAmountExpected} does not match Actual Tax Amount: ${taxAmountActual}`);
            failCounter++;
        }

        // make sure total is correct and then finish order
        const totalAmount = await inventoryPage.totalForAllItemsWithTax();
        const totalAmountUI = await inventoryPage.totalPriceWithTaxesUI();
        try {
            expect(totalAmount).to.equal(totalAmountUI);
        } catch (error) {
            logger.error(`FAILED: Total Amount Expected:${totalAmountUI} does not match Actual Total Amount: ${totalAmount}`);
            failCounter++;
        }

        await inventoryPage.clickFinishOrderButton();

        //make sure user is redirected to the order complete page
        const currentURL3 = await driver.getCurrentUrl();
        const expectedURL3 = 'https://www.saucedemo.com/checkout-complete.html';

        try {
            expect(currentURL3).to.equal(expectedURL3);
        } catch (error) {
            logger.error(`FAILED: Expected Checkout Complete URL:${expectedURL3} does not match Current URL: ${currentURL3}`);
            failCounter++;
        }

        // check for the order verification image and texts
        const checkmarkImageIsVisible = await inventoryPage.checkmarkVisible();
        try {
            expect(checkmarkImageIsVisible).to.equal(true);
        } catch (error) {
            logger.error(`FAILED: Expected Checkmark Image to be visible`);
            failCounter++;
        }

        const checkoutCompleteMessage = await inventoryPage.checkoutCompleteMessageText();
        const actualCheckoutCompleteMessage = 'Checkout: Complete!';
        try {
            expect(checkoutCompleteMessage).to.equal(actualCheckoutCompleteMessage);
        } catch (error) {
            logger.error(`FAILED: Expected Checkout Complete Message to be visible/correct`);
            failCounter++;
        }

        const thankYouForOrderMessage = await inventoryPage.thankYouForOrderMessageText();
        const actualThankYouForOrderMessage = 'Thank you for your order!';
        try {
            expect(thankYouForOrderMessage).to.equal(actualThankYouForOrderMessage);
        } catch (error) {
            logger.error(`FAILED: Expected Thank You For Order Message to be visible/correct`);
            failCounter++;
        }

        //click back home button and verify user is redirected to inventory page
        await inventoryPage.clickBackHomeButton();
        const currentURL4 = await driver.getCurrentUrl();
        const expectedURL4 = 'https://www.saucedemo.com/inventory.html';
        try {
            expect(currentURL4).to.equal(expectedURL4);
        } catch (error) {
            logger.error(`FAILED: Expected Inventory URL:${expectedURL4} does not match Current URL: ${currentURL4}`);
            failCounter++;
        }

        // if all tests steps passed then Test itself passed saying if its true then test passed
        if (failCounter === 0) {
            logger.info(`Test#3 - PASSED`);
        } else {
            logger.error(`Test#3 - FAILED: ${failCounter} test steps failed.`);
        }        
        
    });


    // Test#4- Add Items to Cart and then buy them
    it('Test#4 - Verify adding multiple items to cart and then Verify buying them', async () => {
        let failCounter = 0;

        // add backpack, BoltTshirt and Onesie and proceed to cart and click checkout
        await inventoryPage.clickAddToCartBackpack();
        await inventoryPage.clickAddToCartBoltTshirt();
        await inventoryPage.addToCartOnesie();
        await inventoryPage.clickCartBadge();
        await inventoryPage.clickCheckoutButton();

        // // verify that the user is redirected to the checkout page
        const currentURL = await driver.getCurrentUrl();
        const expectedURL = 'https://www.saucedemo.com/checkout-step-one.html';
        try {
            expect(currentURL).to.equal(expectedURL);
        } catch (error) {
            logger.error(`FAILED: Expected Checkout URL:${expectedURL} does not match Current URL: ${currentURL}`);
            failCounter++;
        }
        
        // checkout with premade user info and then verify user is in checkout overview
        await inventoryPage.checkout("John", "Doe", "12345");
        const currentURL2 = await driver.getCurrentUrl();
        const expectedURL2 = 'https://www.saucedemo.com/checkout-step-two.html';

        try {
            expect(currentURL2).to.equal(expectedURL2);
        } catch (error) {
            logger.error(`FAILED: Expected Checkout URL:${expectedURL2} does not match Current URL: ${currentURL2}`);
            failCounter++;
        }

        // make sure all 3 items are in cart
        const cartItem = await inventoryPage.cartInventoryItem();
        const cartItem2 = await inventoryPage.cartInventoryItem2();
        const cartItem3 = await inventoryPage.cartInventoryItem3();
        const cartItemExpected = 'Sauce Labs Backpack';
        const cartItemExpected2 = 'Sauce Labs Bolt T-Shirt';
        const cartItemExpected3 = 'Sauce Labs Onesie';
        
        try{
            expect(cartItem).to.equal(cartItemExpected);
        } catch (error) {
            logger.error(`FAILED: Backpack Expected cart item:${cartItemExpected} does not match Actual cart item: ${cartItem}`);
            failCounter++;
        }

        try{
            expect(cartItem2).to.equal(cartItemExpected2);
        } catch (error) {
            logger.error(`FAILED: Bolt T-Shirt Expected cart item:${cartItemExpected2} does not match Actual cart item: ${cartItem2}`);
            failCounter++;
        }

        try{
            expect(cartItem3).to.equal(cartItemExpected3);
        } catch (error) {
            logger.error(`FAILED: Onesie Expected cart item:${cartItemExpected3} does not match Actual cart item: ${cartItem3}`);
            failCounter++;
        }
        
        expect(cartItem2).to.equal(cartItemExpected2);
        expect(cartItem3).to.equal(cartItemExpected3);

        //make sure pricing is correct for each item
        const totalOfBackpackBoltshirtAndOnesie = await inventoryPage.totalFromItemTotal();
        const totalForAllItemsWithoutTax = await inventoryPage.totalForAllItemsWithoutTax();
        try {
            expect(totalForAllItemsWithoutTax).to.equal(totalOfBackpackBoltshirtAndOnesie);
        } catch (error) {
            logger.error(`FAILED: Total Amount without tax Expected:${totalOfBackpackBoltshirtAndOnesie} does not match Actual Total Amount without tax: ${totalForAllItemsWithoutTax}`);
            failCounter++;
        }

        //make sure tax is correct for order total
        const taxAmountActual = await inventoryPage.taxAmountActual();
        const taxAmountExpected = await inventoryPage.taxAmountExpectedUI();
        try {
            expect(taxAmountActual).to.equal(taxAmountExpected);
        } catch (error) {
            logger.error(`FAILED: Tax Amount Expected:${taxAmountExpected} does not match Actual Tax Amount: ${taxAmountActual}`);
            failCounter++;
        }

        //make sure tax and total is correct and then finish order
        const totalAmountOfItemsUI = await inventoryPage.totalPriceWithTaxesUI();
        const totalAmountOfItems = await inventoryPage.totalForAllItemsWithTax();
        try {
            expect(totalAmountOfItems).to.equal(totalAmountOfItemsUI);
        } catch (error) {
            logger.error(`FAILED: Total Amount with Tax Expected:${totalAmountOfItemsUI} does not match Actual Total Amount with Tax: ${totalAmountOfItems}`);
            failCounter++;
        }

        await inventoryPage.clickFinishOrderButton();

        //make sure user is redirected to the order complete page
        const currentURL3 = await driver.getCurrentUrl();
        const expectedURL3 = 'https://www.saucedemo.com/checkout-complete.html';

        try {
            expect(currentURL3).to.equal(expectedURL3);
        } catch (error) {
            logger.error(`FAILED: Expected Checkout Complete URL:${expectedURL3} does not match Current URL: ${currentURL3}`);
            failCounter++;
        }
        
        // check for the order verification image and texts
        const checkmarkImageIsVisible = await inventoryPage.checkmarkVisible();
        try {
            expect(checkmarkImageIsVisible).to.equal(true);
        } catch (error) {
            logger.error(`FAILED: Expected Checkmark Image to be visible`);
            failCounter++;
        }

        const checkoutCompleteMessage = await inventoryPage.checkoutCompleteMessageText();
        const actualCheckoutCompleteMessage = 'Checkout: Complete!';
        try {
            expect(checkoutCompleteMessage).to.equal(actualCheckoutCompleteMessage);
        } catch (error) {
            logger.error(`FAILED: Expected Checkout Complete Message to be visible/correct`);
            failCounter++;
        }

        const thankYouForOrderMessage = await inventoryPage.thankYouForOrderMessageText();
        const actualThankYouForOrderMessage = 'Thank you for your order!';
        try {
            expect(thankYouForOrderMessage).to.equal(actualThankYouForOrderMessage);
        } catch (error) {
            logger.error(`FAILED: Expected Thank You For Order Message to be visible/correct`);
            failCounter++;
        }

        //click back home button and verify user is redirected to inventory page
        await inventoryPage.clickBackHomeButton();
        const currentURL4 = await driver.getCurrentUrl();
        const expectedURL4 = 'https://www.saucedemo.com/inventory.html';
        try {
            expect(currentURL4).to.equal(expectedURL4);
        } catch (error) {
            logger.error(`FAILED: Expected Inventory Page URL:${expectedURL4} does not match Current URL: ${currentURL4}`);
            failCounter++;
        }

        // if all tests steps passed then Test itself passed saying if its true then test passed
        if (failCounter === 0) {
            logger.info(`Test#4 - PASSED`);
        } else {
            logger.error(`Test#4 - FAILED: ${failCounter} test steps failed.`);
        }  

    });

    // Test#5- Hamburger Menu Functionality Test
    it('Test#5 - Verify hamburger menu functionality', async () => {
        let failCounter = 0;

        // add backpack item to cart
        await inventoryPage.clickAddToCartBackpack();
        
        // verify that the item was added to the cart
        const cartBadge = await inventoryPage.getCartBadgeText();
        const cartBadgeExpected = '1';
        try {
            expect(cartBadge).to.equal(cartBadgeExpected);
        } catch (error) {
            logger.error(`FAILED: Expected cart badge text: ${cartBadgeExpected}, Actual cart badge text: ${cartBadge}`);
            failCounter++;
        }
        
        // click on hamburger menu
        await inventoryPage.clickHamburgerMenu();
        //after clicking hamburger menu, wait for the hamburger item list to be visible otherwise test will fail
        await inventoryPage.hamburgerItemListVisible();
        // and reset app state to verify it works by checking for empty cart
        await inventoryPage.clickResetAppStateLink();

        // cartBadge element itself isn't visible anymore, so false is expected
        const cartBadgeIsVisible = await inventoryPage.cartBadgeVisible();
        try {
            expect(cartBadgeIsVisible).to.equal(false);
        } catch (error) {
            logger.error(`FAILED: Expected cart badge to be invisible`);
            failCounter++;
        }
        
        /* click on cart to go to cart page and then use click on all items from hamburger menu and verify
        it brings you back to inventory page */
        await inventoryPage.clickCartButton();
        await inventoryPage.clickHamburgerMenu();
        await inventoryPage.hamburgerItemListVisible();
        await inventoryPage.clickAllItems();

        // verify user is in inventory page
        const currentURL = await driver.getCurrentUrl();
        const expectedURL = 'https://www.saucedemo.com/inventory.html';
        try {
            expect(currentURL).to.equal(expectedURL);
        } catch (error) {
            logger.error(`FAILED: Expected Inventory URL:${expectedURL} does not match Current URL: ${currentURL}`);
            failCounter++;
        }

        // click on about from hamburger menu and click logout and verify user is redirected to login page
        await inventoryPage.clickHamburgerMenu();
        await inventoryPage.hamburgerItemListVisible();
        await inventoryPage.clickLogoutLink();

        // verify user is in login page
        const currentURL2 = await driver.getCurrentUrl();
        const expectedURL2 = 'https://www.saucedemo.com/';
        try {
            expect(currentURL2).to.equal(expectedURL2);
        } catch (error) {
            logger.error(`FAILED: Expected Login URL:${expectedURL2} does not match Current URL: ${currentURL2}`);
            failCounter++;
        }

        // if all tests steps passed then Test itself passed saying if its true then test passed
        if (failCounter === 0) {
            logger.info(`Test#5 - PASSED`);
        } else {
            logger.error(`Test#5 - FAILED: ${failCounter} test steps failed.`);
        }  

        logger.info('inventoryPageTests Completed');
    });
});
