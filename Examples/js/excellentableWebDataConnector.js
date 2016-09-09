(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "A",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "B",
            alias: "B",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "C",
            alias: "C",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "D",
            alias: "D",
            // columnRole: "dimension",
            // Do not aggregate values as measures in Tableau--makes it easier to add to a map
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "E",
            alias: "E",
            // columnRole: "dimension",
            // Do not aggregate values as measures in Tableau--makes it easier to add to a map
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "F",
            alias: "F",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "G",
            alias: "G",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "H",
            alias: "H",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "I",
            alias: "I",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "J",
            alias: "J",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "K",
            alias: "K",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "L",
            alias: "L",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "M",
            alias: "M",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "N",
            alias: "N",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "earthquakeFeed",
            alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
      //Comment this to get data from server
      // #1
        $.getJSON("../sampleData.json", function(resp) {
      // Uncomment this whole block to get data from server
      // #2 - Start here
          // $.getJSON("http://CONFLUENCE-BASE-URL/rest/excellentable/1.0/content/table/1", function(resp) {

                /*var tableData = [];
                var tableMetaData = resp.metaData.trim()
                var sheet1 = jQuery.parseJSON(tableMetaData).sheets.Sheet1;
                var rowCount = sheet1.rowCount;
                var columnCount = sheet1.columnCount;
                var dataTable = sheet1.data.dataTable;
                for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                    var columnNameObject = {};
                    for (var colIndex = 0; colIndex < columnCount; colIndex++) {
                        try {
                            columnNameObject[String.fromCharCode(65+colIndex)] = dataTable[rowIndex][colIndex].value;
                        } catch (e) {
                            columnNameObject[String.fromCharCode(65+colIndex)] = "";
                        }
                    }
                    tableData.push(columnNameObject);
                }*/
        // #2 End here
            table.appendRows(resp);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "USGS Earthquake Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
