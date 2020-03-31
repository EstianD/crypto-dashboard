// GET LATEST PRICE INFO
const getLatestPrices = async () => {
   const res = await axios.get('http://localhost:4000/api/crypto/get-latest')

   let krakenPrice, bitstampPrice, lunoPrice, krakenPercDiff, bitstampPercDiff

   let lunoElement = document.getElementById('luno-value')
   let krakenElement = document.getElementById('kraken-value')
   let bitstampElement = document.getElementById('bitstamp-value')
   let lunoKrakenPerc = document.getElementById('luno-kraken-perc-diff')
   let lunoBitstampPerc = document.getElementById('luno-bitstamp-perc-diff')

   krakenPrice = res.data[0].kraken
   bitstampPrice = res.data[0].bitstamp
   lunoPrice = res.data[0].luno

   // LUNO/KRAKEN COMPARISON
   krakenPercDiff = ((lunoPrice - krakenPrice) / lunoPrice) * 100

   krakenPercDiff = krakenPercDiff.toFixed(1)

   // LUNO/BITSTAMP COMPARISON
   bitstampPercDiff = ((lunoPrice - bitstampPrice) / lunoPrice) * 100

   bitstampPercDiff = bitstampPercDiff.toFixed(1)

   lunoElement.innerHTML = `R${lunoPrice}`
   krakenElement.innerHTML = `R${krakenPrice}`
   bitstampElement.innerHTML = `R${bitstampPrice}`

   // LUNO/KRAKEN
   // SET VALUES TO ELEMENT
   // IF PERC IS POSITIVE
   if(krakenPercDiff > 0){

      lunoElement.classList.add("positive-diff")
      krakenElement.classList.add("negative-diff")

      lunoKrakenPerc.classList.add("positive-diff");
      lunoKrakenPerc.innerHTML = `<span style="color:green">&#9650;</span>${krakenPercDiff}%`
   } else {
      // IF PERC IS NEGATIVE
      lunoElement.classList.add("negative-diff")
      krakenElement.classList.add("positive-diff")

      lunoKrakenPerc.classList.add("negative-diff");
      lunoKrakenPerc.innerHTML = `<span style="color:red">&#9660;</span>${krakenPercDiff}%`
   }

   // LUNO/BITSTAMP
   // IF PERC IS POSITIVE
   if(bitstampPercDiff > 0){
      lunoElement.classList.add("positive-diff")
      bitstampElement.classList.add("negative-diff")

      lunoBitstampPerc.classList.add("positive-diff");
      lunoBitstampPerc.innerHTML = `<span style="color:green">&#9650;</span>${bitstampPercDiff}%`
   } else {
      lunoElement.classList.add("negative-diff")
      bitstampElement.classList.add("positive-diff")

      lunoBitstampPerc.classList.add("negative-diff");
      lunoBitstampPerc.innerHTML = `<span style="color:red">&#9660;</span>${bitstampPercDiff}%`
   }
}

// GET LATEST 24HOURS OF DATA FOR TABLE
const loadTableData = async () => {

   const res = await axios.get('http://localhost:4000/api/crypto/last-24-hours')

   var elmtTable = document.getElementById('data-table');
   var tableRows = elmtTable.getElementsByTagName('tr');
   var rowCount = tableRows.length;

   for (var x=rowCount-1; x>0; x--) {
      elmtTable.removeChild(tableRows[x]);
   }

   res.data.map((val) => {

      let krakenDiffCol
      let bitstampDiffCol
      
      let newRow=document.getElementById('data-table').insertRow();

      // KRAKEN
      if(val.krakenDiff > 0){
         krakenDiffCol = `<td><span style="color:green">&#9650;</span>${val.krakenDiff}%</td>`
      } else if(val.krakenDiff < 0){
         krakenDiffCol = `<td><span style="color:red">&#9660;</span>${val.krakenDiff}%</td>`
      } else {
         krakenDiffCol = `<td>-</td>`
      }

      // BITSTAMP
      if(val.bitstampDiff > 0){
         bitstampDiffCol = `<td><span style="color:green">&#9650;</span>${val.bitstampDiff}%</td>`
      } else if(val.bitstampDiff < 0){
         bitstampDiffCol = `<td><span style="color:red">&#9660;</span>${val.krakenDiff}%</td>`
      } else {
         bitstampDiffCol = `<td>-</td>`
      }
      
      newRow.innerHTML = `<td>${val.createdAt}</td>
         <td class="luno-col">R${val.luno}</td>
         ${krakenDiffCol}
         <td>R${val.kraken}</td>
         ${bitstampDiffCol}
         <td>R${val.bitstamp}</td>`

   })
}


// CALL FUNCTIONS
getLatestPrices()
loadTableData()
// GET LATEST PRICES EVERY 5 MINUTES
setInterval(() => {
   // LOAD CHART
   getLatestPrices()
   // LOAD TABLE
   loadTableData()
}, 300000)
