// CSV file is locally stored in static/data folder but could also be hosted, in this case the unpack function should be placed locally inside the top Plotly.d3.csv() wrapper

// Defome three unique arrays with data for the CSV file, the y trace column name, and the chart title selections corresponding to different chart types
const csvFile = [ "Produced_WK_Data", "Supplied_WK_Data", "UNL_Gas_WK_Prices", "Diesel_WK_Prices", "WTI_DL_Spot_Prices" ];
const yTraceEntry = [ 'Produced', 'Supplied', 'Price', 'Price', 'Price' ];
const chartName = [ "US Weekly Oil Production", "US Weekly Oil Consumption", "US Weekly UNL Gasoline Prices", "US Weekly Diesel Prices", "Cushing WTI Daily Spot Prices" ];

// Chart Selector function to update the index value from [ 0 to 4 ] depeonding on the user's chart selection provided by HTML dropdown element
function chartSelection(index=0) {   
    Plotly.d3.csv(`/static/data/${csvFile[index]}.csv`, function(rows) {

        var trace1 = {
            type: "scatter",
            mode: "lines",
            x: unpack(rows, 'Date'),
            y: unpack(rows, yTraceEntry[index]),
            line: {color: '#17BECF'}
        };

        var data = [trace1];

        // To be defined via dialog box entry by the user if the time permits
        var startDate = '2015-07-10'; /* dynamic chart start date */
        var endDate = '2020-07-10';   /* dynamic chart end date */

        var layout = {
            title: chartName[index],
            xaxis: {
                range: [startDate, endDate],
                type: 'date'
            },
            yaxis: {
                autorange: true,
                type: 'linear'
            },
            showlegend: false
        };
        // Needs to use newPlot method to overwite the existing plot    
        Plotly.newPlot('plotdiv', data, layout);

    });
}

// Function unpacking row based CSV data into column based arrays
function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
}

// Initialize the chart
chartSelection();

// Implement an event listener to catch chart selection updates
document.getElementById("chartdropdown")
        .addEventListener("change", function() {
            chartSelection(this.value);
        }
);
