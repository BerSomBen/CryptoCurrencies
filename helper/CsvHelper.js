class CsvHelper {
    constructor(filePath) {
        this.filePath = filePath;
    }

    writeAppendToFile(data) {
        if (data["Timestamp"] === undefined ||
            data["Bitcoin"] === undefined ||
            data["BitcoinCash"] === undefined ||
            data["Etherium"] === undefined ||
            data["Ripple"] === undefined)
            throw new TypeError("must contain 'Bitcoin, Timestamp, BitcoinCash, Etherium, Ripple'");
        let fs = require('fs');
        let csvWriter = require('csv-write-stream');
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

}

module.exports = CsvHelper;