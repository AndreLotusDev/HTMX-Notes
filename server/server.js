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