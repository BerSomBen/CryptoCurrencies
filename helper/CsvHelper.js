let fs = require('fs');
let csvWriter = require('csv-write-stream');

class CsvHelper {

    constructor(filePath) {
        this.filePath = filePath;
    }


    checkParams(data) {
        if (data["Timestamp"] === undefined ||
            data["Bitcoin"] === undefined ||
            data["BitcoinCash"] === undefined ||
            data["Etherium"] === undefined ||
            data["Ripple"] === undefined)
            throw new TypeError("must contain 'Bitcoin, Timestamp, BitcoinCash, Etherium, Ripple'");
    }

    writeAppendToFile(data) {
        this.checkParams(data);

        let writer = csvWriter();
        if (!fs.existsSync(this.filePath))
            writer = csvWriter({headers: ["Timestamp", "Bitcoin", "BitcoinCash", "Etherium", "Ripple"]});
        else
            writer = csvWriter({sendHeaders: false});

        writer.pipe(fs.createWriteStream(this.filePath, {flags: 'a'}));
        writer.write({
            Timestamp: data["Timestamp"],
            Bitcoin: data["Bitcoin"],
            BitcoinCash: data["BitcoinCash"],
            Etherium: data["Etherium"],
            Ripple: data["Ripple"],

        });
        writer.end();
    }

    writeAppendToCurrencyFiles() {
        this.checkParams(data);

        let writer = csvWriter();

        let bitCoinPath= this.filePath.replace("[currency]","BitCoin");
        let bitCoinCashPath= this.filePath.replace("[currency]","BitCoinCash");
        let etheriumPath= this.filePath.replace("[currency]","Etherium");
        let ripplePath= this.filePath.replace("[currency]","Ripple");


    }


    appendDataToFile(filePath,header,dataNames,data){
        if (!fs.existsSync(filePath))
            writer = csvWriter({headers: ["Timestamp", "Bitcoin"]});
        else
            writer = csvWriter({sendHeaders: false});

        writer.pipe(fs.createWriteStream(this.filePath, {flags: 'a'}));
        writer.write({
            Timestamp: data["Timestamp"],
            Bitcoin: data["Bitcoin"],
        });
        writer.end();
    }
}

module.exports = CsvHelper;