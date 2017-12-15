class ExcelHelper {
    appendLineToFile(filepath, line) {
        var Excel = require('exceljs');

        var workbook = new Excel.Workbook();
        let filename = filepath;
        return workbook.xlsx.readFile(filename).then(function () {
            var worksheet = workbook.getWorksheet('Daten');

            return worksheet.addRow(line);

        }).then(function () {
            return workbook.xlsx.writeFile(filename)
                .then(function () {
                    // done
                });

        })
    }
}

module.exports = ExcelHelper;