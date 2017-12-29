let webdriver = require("selenium-webdriver");
let By = webdriver.By;
let Promise = require("bluebird");
const timeout = 2000;

class Ripple {
    constructor(driver) {
        this.driver = driver;
    }

    getCurrentExchangeRate(amount) {
        let d = Promise.defer();
        let self = this;
        let curVal = 0;
        self.driver.get("https://www.finanzen.net/devisen/ripple-euro-kurs").then(function () {

            return self.driver.findElement(By.xpath("//div[@class='col-xs-5 col-sm-4 text-sm-right text-nowrap']/div")).then(function (elem) {
                return elem.getText().then(function (txt) {
                    curVal = parseFloat(txt.replace(".", "").replace(",", ".").replace("EUR", ""));
                    d.resolve(curVal);
                });

            })


        });
        return d.promise;
    }
}

module
    .exports = Ripple;