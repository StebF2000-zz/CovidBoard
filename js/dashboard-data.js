const ctx = document.getElementById('myChart');

// Chart config
let mixedChart = new Chart(ctx,
    {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Deaths',
                    data: [],
                    borderColor: '#000000',
                    fill: false,
                    order: 0
                },
                {
                    label: 'Hospitalized',
                    data: [],
                    borderColor: '#FF0000',
                    fill: false,
                    order: 1
                },
                {
                    label: 'Recovered',
                    data: [],
                    borderColor: '#00FF00',
                    fill: false,
                    order: 2
                },
                {
                    label: 'Positives',
                    data: [],
                    borderColor: '#0000FF',
                    fill: false,
                    order: 3
                }
            ],
            labels: []
        },

        options: {
            devicePixelRatio: 1,
            scales: {
                yAxes: [],
                xAxes: []
            },
            layout: {
                padding: 'auto',
            },
            legend: {
                display: true,
                position: 'bottom',
                align: 'center',
            },
            tooltip: {
                mode: 'dataset'
            }
        }
    })

// Adding data to each label
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach(dataset => {
        if (data) {
            dataset.data.push(data[dataset.label]);
        }
    })
    chart.update();
}

// Getting JSON data
async function getAPI(date) {
    const API_URL = 'https://api.covid19tracking.narrativa.com/api/';
    return fetch(API_URL + date)
        .then(res => res.json());
}


// Last 7 days
async function getlastweek() {
    const days = [];

    for (let i = 0; i < 7; i++) {
        let d = new Date();
        d.setDate(d.getDate() - (i + 1));

        // Convert to correct format
        let day = ("0" + d.getDate()).slice(-2);
        let month = ("0" + (d.getMonth() + 1)).slice(-2);
        let year = d.getFullYear();
        const today = year + "-" + month + "-" + day;

        days.unshift(today);
    }

    for (let i = 0; i < days.length; i++) {
        const data = await getAPI(days[i]);
        const pair = {
            'Positives': data.total.today_new_confirmed,
            'Deaths': data.total.today_new_deaths,
            'Recovered': data.total.today_new_recovered,
            'Hospitalized': data.total.today_new_open_cases
        };
        addData(mixedChart, data.total.date, pair);
    }
}

// Fetching last 7 days data & representing
getlastweek();