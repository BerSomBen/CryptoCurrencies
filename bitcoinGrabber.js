let webdriver = require("selenium-webdriver");
let By = webdriver.By;
let BitCoin = require("./page/bitCoin.js");
let ExcelHelper = require("./page/ExcelHelper.js");
let BitCoinCash = require("./page/bitCoinCash.js");
let Etherium = require("./page/Etherium.js");
let Ripple = require("./page/Ripple.js");

require("phantomjs-prebuilt");
require("mocha");
let expect = require("chai").expect;
const winston = require('winston');

let path = require('path'),
    filename = path.join(__dirname, 'created-logfile.log');

//
// Create a new winston logger instance with two tranports: Console, and File
//
//
let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: filename})
    ]
});


let driver = null;
describe("Get Latest Bitcoin Curses", function () {
    before(function () {

        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.phantomjs())
            .build();
        return driver.get("https://www.bitcoin.de/de/etheur/market").then(function () {
            return driver.sleep(1000);
        }).then(function () {
            return driver.findElement(By.xpath("//a[@href='/layout-switch?layout=d']")).click();
        });
    });

    after(function () {
        try {
            return driver.quit();

        } catch (ex) {
            return driver.close();
        }
    });

    xit("getCurrentTable", function () {
        return driver.findElement(By.id("trade_offer_results_table_body")).then(function (elem) {
            return elem.getText().then(function (txt) {
                logger.info(txt);
            })
        });
    });

    xit("GetBuyValue Etherium", function () {
        let curVal = 0;
        return driver.findElement(By.id("rate_buy")).then(function (elem) {
            return elem.getText().then(function (txt) {
                curVal = parseFloat(txt);
            });
        }).then(function () {
            return driver.findElement(By.id("search_offer_amount")).then(function (elem) {
                return elem.sendKeys("1");
            });
        }).then(function () {
            return driver.findElement(By.id("search_offer_critical_price")).then(function (elem) {
                return elem.sendKeys(curVal + 5);
            });
        }).then(function () {
            return driver.sleep(1000);

        }).then(function () {
            return driver.findElement(By.id("trade_offer_results_table_body")).then(function (elem) {
                return elem.findElement(By.xpath("./tr/td[@class='aright']")).then(function (elem) {
                    return elem.getText().then(function (txt) {
                        logger.info("Etherium: " + txt);

                    })
                })
            });
        });
    });

    xit("GetBuyValue BitCoinCash", function () {
        let curVal = 0;
        return driver.get("https://www.bitcoin.de/de/bcheur/market").then(function () {
            return driver.sleep(1000);
        }).then(function () {

            return driver.findElement(By.id("rate_buy")).then(function (elem) {
                return elem.getText().then(function (txt) {
                    curVal = parseFloat(txt.replace(".", ""));
                });
            })
        }).then(function () {
            return driver.findElement(By.id("search_offer_amount")).then(function (elem) {
                return elem.sendKeys("0,1");
            });
        }).then(function () {
            return driver.findElement(By.id("search_offer_critical_price")).then(function (elem) {
                return elem.sendKeys(curVal + 200);
            });
        }).then(function () {
            return driver.sleep(1000);

        }).then(function () {
            return driver.findElement(By.id("trade_offer_results_table_body")).then(function (elem) {
                return elem.findElement(By.xpath("./tr/td[@class='aright']")).then(function (elem) {
                    return elem.getText().then(function (txt) {
                        logger.info("BitcoinCash: " + txt);

                    })
                })
            });
        });
    });

    xit("GetBuyValue BitCoin", function () {
        let curVal = 0;
        return driver.get("https://www.bitcoin.de/de/btceur/market").then(function () {
            return driver.sleep(1000);
        }).then(function () {

            return driver.findElement(By.id("rate_buy")).then(function (elem) {
                return elem.getText().then(function (txt) {
                    curVal = parseFloat(txt.replace(".", ""));
                });
            })
        }).then(function () {
            return driver.findElement(By.id("search_offer_amount")).then(function (elem) {
                return elem.sendKeys("0,01");
            });
        }).then(function () {
            return driver.findElement(By.id("search_offer_critical_price")).then(function (elem) {
                return elem.sendKeys(curVal + 150);
            });
        }).then(function () {
            return driver.sleep(1000);

        }).then(function () {
            return driver.findElement(By.id("trade_offer_results_table_body")).then(function (elem) {
                return elem.findElement(By.xpath("./tr/td[@class='aright']")).then(function (elem) {
                    return elem.getText().then(function (txt) {
                        logger.info("Bitcoin: " + txt);

                    })
                })
            });
        });
    });

    xit("shell write data to xlsx", function () {
        let Excel = require('exceljs');

        let workbook = new Excel.Workbook();
        let filename = "bitcoins.xlsx";
        return workbook.xlsx.readFile(filename).then(function () {
            let worksheet = workbook.getWorksheet('Daten');

            return worksheet.addRow([new Date(),]);

        }).then(function () {
            return workbook.xlsx.writeFile(filename)
                .then(function () {
                    // done
                });

        })

    });

    xit("class Bitcoin Test", function () {
        let bla = new BitCoin(driver);
        expect(bla).not.to.be.undefined;
    });
    xit("class Bitcoin Test Get Value", function () {
        let bla = new BitCoin(driver);
        return bla.getCurrentExchangeRate("0,01").then(function (val) {
            expect(val).to.be.greaterThan(10000);
        })
    });


    it("class Bitcoin Test", function () {
        let bla = new BitCoinCash(driver);
        expect(bla).not.to.be.undefined;
    });
    xit("class Bitcoin Cash Test Get Value", function () {
        let bla = new BitCoinCash(driver);
        return bla.getCurrentExchangeRate("0,1").then(function (val) {
            expect(val).to.be.greaterThan(1000);
        })
    });
    xit("class Ripple Test Get Value", function () {
        let bla = new Ripple(driver);
        return bla.getCurrentExchangeRate("1").then(function (val) {
            expect(val).to.be.greaterThan(1);
        })
    });

    xit("class Etherium Test", function () {
        let bla = new BitCoinCash(driver);
        expect(bla).not.to.be.undefined;
    });
    it("class Etherium Test Get Value", function () {
        let bla = new Etherium(driver);
        return bla.getCurrentExchangeRate("1").then(function (val) {
            expect(val).to.be.greaterThan(500);
        })
    });
    it("getAllAndAddToSpreadSheet", function () {
        let bla = new ExcelHelper();
        let eth = new Etherium(driver);
        let btc = new BitCoin(driver);
        let bcc = new BitCoinCash(driver);
        let rxp = new Ripple(driver);
        let btcValue = 0;
        let bccValue = 0;
        let ethValue = 0;
        let rxpValue = 0;

        return eth.getCurrentExchangeRate("1").then(function (res) {
            ethValue = res;
        }).then(function () {
            return bcc.getCurrentExchangeRate("0,1").then(function (res) {
                bccValue = res;
            })
        }).then(function () {
            return btc.getCurrentExchangeRate("0,01").then(function (res) {
                btcValue = res;
            })
        }).then(function () {
            return rxp.getCurrentExchangeRate("1").then(function (res) {
                rxpValue = res;
            })
        }).then(function () {
            let line = [new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').replace("-", ".").replace("-", "."), btcValue, bccValue, ethValue, rxpValue];
            logger.info(line);

            return bla.appendLineToFile("bitcoins.xlsx", line);
        }).then(function () {
            logger.info("did it!")
        });


    });

});