      d3.json("data.json", function(data) {
      var data = data;

      // Summary table values
        //  current expected value of mortality rate wordwide 
        var total_cases = data.map(column => column.TotalCases).reduce(function(a,b){
          return a + b
        }, 0);
        var total_countries = data.length;
        var weighted_mortality_per_country = data.map(row=> (row.TotalDeaths/row.TotalCases)*(row.TotalCases/total_cases)).reduce(function(a,b){
          return a + b
        }, 0);
        console.log(weighted_mortality_per_country);
        var dates = new Date(data.map(row=> (row.Date)).slice(1,2));
        // var date = new Date.parse(dates);
        console.log(`Date Updated: ${(dates)}`)
        d3.select("#date-time").text(dates);

    // New cases per country chart
      var trace1 = {
        x: data.map(row => row.Country),
        y: data.map(row => row.NewCases),
        type: "bar",
        text: data.map(row => row.NewCases),
        textposition: 'auto',
        hoverinfo: 'none',
        marker: {
          color: 'rgb(192,192,192)',
          opacity: 0.7,
          line: {
            color: 'rgb(190,0,0)',
            width: 2
          }},
        transforms: [{
          type: 'sort',
          target: 'y',
          order: 'descending'},
          {type: 'filter',
          target: 'y',
          operation: '>',
          value: 229
        }]
        
      };
      var plotData = [trace1];
      
      var layout = {
        title: "Top Total New Cases Per Country (Past 12 Hours)"};
      
      Plotly.newPlot("plot", plotData, layout)});

// total deaths chart
      d3.json("data.json", function(data) {
        var data = data;
        var trace1 = {
          x: data.map(row => row.Country),
          y: data.map(row => row.TotalDeaths),
          type: "bar",
          text: data.map(row => row.TotalDeaths),
          textposition: 'auto',
          // hoverinfo: 'none',
          marker: {
            color: 'rrgb(140,0,0)',
            opacity: 0.7,
            line: {
              color: 'rgb(200,0,0)',
              width: 2}
            },
          transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'},
            {type: 'filter',
            target: 'y',
            operation: '>',
            value: 229
          }]
          
        };
        var plotData = [trace1];
        
        var layout = {
          title: "Top Total Deaths Per Country"
        };
          
        Plotly.newPlot("plot2", plotData, layout);

});
