let startInput = document.getElementById("start").value;
let endInput = document.getElementById("end").value;
let badge = document.getElementById("badges").value;
let showButton = document.getElementById("show");
let max = document.getElementById("max");
let min = document.getElementById("min");
let apiUrl =
  `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startInput}&end=${endInput}`;

function axiosCalling() {
  axios
    .get(apiUrl)
    .then(responseFromAPI => {
      let info = responseFromAPI.data.bpi;
      let maxMin = getMaxMin(info);
      let maxValue = maxMin[0];
      let minValue = maxMin[1];
      writeMaxMin(maxValue, minValue);
      printGraph(info);
    })
    .catch(err => {
      console.log("Error while getting the data: ", err);
    });
}

function printGraph(data) {
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

function getMaxMin(data) {
  let values = Object.values(data);
  let sortedValues = [];
  let max = 0;
  let min = 0;
  let maxMin = [];
  sortedValues = values.sort((a, b) => b - a);
  max = sortedValues[0];
  min = sortedValues[values.length - 1];
  maxMin.push(max);
  maxMin.push(min);
  return (maxMin);
}

function writeMaxMin(maximun, minimun) {
  max.innerText = `${maximun}`;
  min.innerText = `${minimun}`;
}

showButton.onclick = function (btn) {
  btn.preventDefault();
  startInput = document.getElementById("start").value;
  endInput = document.getElementById("end").value;
  badge = document.getElementById("badges").value;
  showButton = document.getElementById("show");
  apiUrl =
    `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startInput}&end=${endInput}&currency=${badge}`;
  axiosCalling();
}

axiosCalling();
