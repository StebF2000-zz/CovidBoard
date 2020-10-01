async function getData(date, region) {
    const API_URL = 'https://api.covid19tracking.narrativa.com/api/';
    const response = await fetch(API_URL + date + '/country/' + region)
    const data = await response.json();

    //  Styling data
    showData(data, date, region);
}

function showData(data, date) {

    let tab = '<thead><tr><th>Region</th>' +
        '<th>New cases</th><th>Total cases</th>' +
        '<th>New deaths</th><th>Total deaths</th></tr></thead>';

    Object.entries(data.dates[date].countries).forEach(country => {

            Object.entries(country[1].regions).forEach(reg => {
                tab += '<tr><th>' + reg[1].name +
                    '</th><th>' + reg[1].today_new_confirmed + '</th>' +
                    '<th>' + reg[1].today_confirmed + '</th>' +
                    '<th>' + reg[1].today_new_deaths + '</th>' +
                    '</th><th>' + reg[1].today_deaths + '</th>' +
                    '</tr>'
            })

            // Total row
            tab += '<tfoot><tr><th>' + country[1].name + '</th>' + '<th>' + country[1].today_new_confirmed + '</th>' +
                '<th>' + country[1].today_confirmed + '</th>' + '<th>' + country[1].today_new_deaths + '</th>' +
                '<th>' + country[1].today_deaths + '</th>' + '</tr></tfoot>';


        }
    )

    document.getElementById('tab1').innerHTML = tab;
}

// Getting today date
date = new Date();

let day = ("0" + date.getDate()).slice(-2);
let month = ("0" + (date.getMonth() + 1)).slice(-2);
let year = date.getFullYear();

const today = year + "-" + month + "-" + day;

// Getting correct country
const country = document.body.getElementsByTagName('script')
let query = country[2].classList;

const res = getData(today, query[0].toLowerCase());