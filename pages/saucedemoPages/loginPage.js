const { By } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameTextLocator = By.css("#user-name");
        this.passwordTextLocator = By.css("#password");
        this.loginButtonLocator = By.css("#login-button");
    }

    async enterStandardUser() {
        await this.driver.findElement(this.usernameTextLocator).sendKeys("standard_user");
    }

    async enterProblemUser() {
        await this.driver.findElement(this.usernameTextLocator).sendKeys("problem_user");
    }

    async enterIncorrectUsername() {
        await this.driver.findElement(this.usernameTextLocator).sendKeys("non_standard_user");
    }

    async enterCorrectPassword() {
        await this.driver.findElement(this.passwordTextLocator).sendKeys("secret_sauce");
    }

    async enterIncorrectPassword() {
        await this.driver.findElement(this.passwordTextLocator).sendKeys("lamb_sauce");
    }

    async clickLogin() {
        await this.driver.findElement(this.loginButtonLocator).click();
    }

    async enterUsername(username) {
        await this.driver.findElement(this.usernameTextLocator).sendKeys(username);
    }

    async enterPassword(password) {
        await this.driver.findElement(this.passwordTextLocator).sendKeys(password);
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async justLogin() {
        await this.enterStandardUser();
        await this.enterCorrectPassword();
        await this.clickLogin();
    }

}

module.exports = LoginPage;

