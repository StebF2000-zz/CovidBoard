async function getAPI(date) {
    const API_URL = 'https://api.covid19tracking.narrativa.com/api/'
    const response = await fetch(API_URL + date)
    const data = await response.json();

    showData(data, date);
}

function showData(data, date) {
    let tab = '<thead><tr><th>Country</th>' +
        '<th>New cases</th><th>Total cases</th>' +
        '<th>New deaths</th><th>Total deaths</th></tr></thead>';

    // Absolute figures
    let total = data.total;

    // Figures by country
    const europe = ['Belgium', 'France', 'Germany', 'Greece', 'Italy', 'Portugal', 'Spain', 'US'];

    Object.entries(data.dates[date].countries).forEach(country => {
        if (europe.indexOf(country[0]) > -1) {
            tab += '<tr><th>' + country[1].name +
                '</th><th>' + country[1].today_new_confirmed + '</th>' +
                '<th>' + country[1].today_confirmed + '</th>' +
                '<th>' + country[1].today_new_deaths + '</th>' +
                '</th><th>' + country[1].today_deaths + '</th>' +
                '</tr>'
        }
    })

    // Total row
    tab += '<tfoot><tr><th>' + total.name + '</th>' + '<th>' + total.today_new_confirmed + '</th>' +
        '<th>' + total.today_confirmed + '</th>' + '<th>' + total.today_new_deaths + '</th>' +
        '<th>' + total.today_deaths + '</th>' + '</tr></tfoot>';

    document.getElementById('tab1').innerHTML = tab;
}

// Getting today date
let date = new Date();

let day = ("0" + date.getDate()).slice(-2);
let month = ("0" + (date.getMonth() + 1)).slice(-2);
let year = date.getFullYear();

const today = year + "-" + month + "-" + day;

getAPI(today);