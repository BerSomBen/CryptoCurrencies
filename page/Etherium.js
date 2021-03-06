let webdriver = require("selenium-webdriver");
let By = webdriver.By;
let Promise = require("bluebird");
const timeout = 2000;

class Etherium {
    constructor(driver) {
        this.driver = driver;
    }

    getCurrentExchangeRate(amount) {
        let d = Promise.defer();
        let self = this;
        let curVal = 0;
        self.driver.get("https://www.bitcoin.de/de/etheur/market").then(function () {
            return self.driver.sleep(timeout);
        }).then(function () {

            return self.driver.findElement(By.id("rate_buy")).then(function (elem) {
                return elem.getText().then(function (txt) {
                    curVal = parseFloat(txt.replace(".", "").replace(",", "."));
                });
            })
        }).then(function () {
            return self.driver.findElement(By.id("search_offer_amount")).then(function (elem) {
                return elem.sendKeys(amount);
            });
        }).then(function () {
            return self.driver.findElement(By.id("search_offer_critical_price")).then(function (elem) {
                return elem.sendKeys(Math.trunc(curVal + 40));
            });
        }).then(function () {
            return self.driver.sleep(timeout);

        }).then(function () {
            return self.driver.findElement(By.id("trade_offer_results_table_body")).then(function (elem) {
                return elem.findElement(By.xpath("./tr/td[@class='aright']")).then(function (elem) {
                    return elem.getText().then(function (txt) {
                        d.resolve(parseFloat(txt.replace(".", "").replace(",", ".")));

                    })
                }, function (err) {
                    return self.driver.findElement(By.id("search_offer_critical_price")).then(function (elem) {
                        return elem.clear().then(function () {

                            return elem.sendKeys(Math.trunc(curVal + 80));
                        })
                    }).then(function () {

                        return self.driver.sleep(timeout);
                    }).then(function () {
                        return self.driver.findElement(By.id("trade_offer_results_table_body")).then(function (elem) {
                            return elem.findElement(By.xpath("./tr/td[@class='aright']")).then(function (elem) {
                                return elem.getText().then(function (txt) {
                                    d.resolve(parseFloat(txt.replace(".", "").replace(",", ".")));

                                })
                            })
                        })
                    })
                })
            });
        });
        return d.promise;
    }
}

module.exports = Etherium;