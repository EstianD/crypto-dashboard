const loadData = async () => {

   const crypto = await axios.get('http://localhost:4000/api/crypto/get-all')

   Highcharts.setOptions({
      colors: ['#000839', '#de7119', '#00bdaa', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
   });

   // LUNO
   let luno = crypto.data.map((val) => {
      return val.luno
   })
   // KRAKEN
   let kraken = crypto.data.map((val) => {
      return val.kraken
   })
   // BITSTAMP
   let bitstamp = crypto.data.map((val) => {
      return val.bitstamp
   })

   let dt = crypto.data
   // console.log(dt)
   // LUNO OBJECT
   const dataLuno = {
      pointStart: dt[0].createdAt,
      pointInterval: 300000,
      data: luno
   }
   // KRAKEN OBJECT
   const dataKraken = {
      pointStart: dt[0].createdAt,
      pointInterval: 300000,
      data: kraken
   }
   // BITSTAMP OBJECT
   const dataBitstamp = {
      pointStart: dt[0].createdAt,
      pointInterval: 300000,
      data: bitstamp
   }

   var start = +new Date();

      // CREATE THE CHART
      Highcharts.stockChart('container', {
         chart: {
            zoomType: 'x'
         },
         boost: {
            useGPUTranslations: true,
            enabled: true,
            allowForce: true,
            seriesThreshold: 4
         },

         rangeSelector: {

            buttons: [{
               type: 'day',
               count: 3,
               text: '3d'
            }, {
               type: 'week',
               count: 1,
               text: '1w'
            }, {
               type: 'month',
               count: 1,
               text: '1m'
            }, {
               type: 'month',
               count: 6,
               text: '6m'
            }, {
               type: 'year',
               count: 1,
               text: '1y'
            }, {
               type: 'all',
               text: 'All'
            }],
            selected: 3,
         },
         

         yAxis: {
            title: {
               text: 'Price (R)'
            },
            opposite:false
         },

         title: {
            text: 'Bitcoin Price between Luno, Kraken and Bitstamp'
         },
         tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>R{point.y}</b> ({point.change})<br/>',
            // valueDecimals: 2,
            split: true
         },

         series: [{
            name: 'LUNO',
            data: dataLuno.data,
            pointStart: dataLuno.pointStart,
            pointInterval: dataLuno.pointInterval,
            tooltip: {
               pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>R{point.y}</b><br/>',
               valueDecimals: 0,
               split: true
            }
         },
         {
            name: 'KRAKEN',
            data: dataKraken.data,
            pointStart: dataKraken.pointStart,
            pointInterval: dataKraken.pointInterval,
            tooltip: {
               pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>R{point.y}</b><br/>',
               valueDecimals: 0,
               split: true
            }
         },
         {
            name: 'BITSTAMP',
            data: dataBitstamp.data,
            pointStart: dataBitstamp.pointStart,
            pointInterval: dataBitstamp.pointInterval,
            tooltip: {
               pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>R{point.y}</b><br/>',
               valueDecimals: 0,
               split: true
            }
         }]

      });
}

loadData()

