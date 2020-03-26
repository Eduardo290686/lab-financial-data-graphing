let startInput = document.getElementById("start").value;
let endInput = document.getElementById("end").value;
let showButton = document.getElementById("show");
let apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startInput}&end=${endInput}`;

function graph(data) {
  let keys = Object.keys(data);
  let values = Object.values(data);
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: keys,
      datasets: [{
        label: 'Bitcoin prize index',
        data: values,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  })
};

function axiosCalling(){
  axios
  .get(apiUrl)
  .then(responseFromAPI => {
    let info = responseFromAPI.data.bpi;
    graph(info);
  })
  .catch(err => {
    console.log("Error while getting the data: ", err);
  });
}

axiosCalling();

showButton.onclick = function (btn) {
  btn.preventDefault();
  startInput = document.getElementById("start").value;
  endInput = document.getElementById("end").value;
  showButton = document.getElementById("show");
  apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startInput}&end=${endInput}`;
  axiosCalling();
}
