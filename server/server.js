import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

//Create a route and fetch a public api where brings 10 random users
app.get('/users', async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/?results=10');
        const users = response.data.results;

        //Get name location and put in a html table
        const table = `
        <table class="m-auto">
            <tr>
                <th>Name</th>
                <th>Location</th>
            </tr>
            ${users.map(user => `
                <tr>
                    <td>${user.name.first} ${user.name.last}</td>
                    <td>${user.location.city}, ${user.location.country}</td>
                </tr>
            `).join('')}
        </table>
        `;

        res.send(table);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/users-delay', async (req, res) => {
    try {

        //Retrieve the delay by query
        let delay = parseInt(req.query.delay) || undefined;

        const response = await axios.get('https://randomuser.me/api/?results=10');
        const users = response.data.results;

        if (!delay)
            setTimeout(() => {
                formatTable(res, users);
            }, 2000);
        else
            setTimeout(() => {
                formatTable(res, users);
            }, delay);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

function formatTable(res, users) {
    //Get name location and put in a html table
    const table = `
    <table class="m-auto">
        <tr>
            <th>Name</th>
            <th>Location</th>
        </tr>
        ${users.map(user => `
            <tr>
                <td>${user.name.first} ${user.name.last}</td>
                <td>${user.location.city}, ${user.location.country}</td>
            </tr>
        `).join('')}
    </table>
    `;

    res.send(table);
}

//Covert celsius to farenheit
function convertCelsiusToFahrenheit(celsius) {
    const fahrenheit = (celsius * 9 / 5) + 32;
    return fahrenheit;
}

app.post('/convert', (req, res) => {
    const temperature = req.body.temperature;
    addDelayOneSecond(() => {
        const convertedTemperature = convertCelsiusToFahrenheit(temperature);
        res.send(`The temperature in farenheit is ${convertedTemperature}`);
    });
});

function addDelayOneSecond(func) {
    setTimeout(func, 1000);
}

app.get('/news', async (req, res) => {
    console.log("hit news");
    let result = await fetchRandomNews();
    
    //Format into a table
    const table = `
    <table class="table m-auto">
        <thead>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
            </tr>
        </thead>
        <tbody>
            ${result.map(article => `
                <tr>
                    <td>${article.title}</td>
                    <td>${article.description}</td>
                    <td><img src="${article.urlToImage}" class="img-fluid"></td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    `;

    console.log(table);
    res.send(table);
});

async function fetchRandomNews() {
    console.log("loading");
    const apiKey = 'CHANGE_HERE'; // I already disabled this key idc
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const articles = data.articles;
        if (articles.length === 0) {
            console.log("Nenhuma notícia encontrada.");
            return;
        }

        console.log(articles);
        return articles;
    } catch (error) {
        console.error("Erro ao buscar notícias:", error);
    }
}
