const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let events = [
    { coords: [60.1699, 24.9384], title: 'Katujuhlat @ Helsinki', description: 'Pienimuotoiset juhlat Helsingin keskustassa.', reactions: { smile: 5, thumbsUp: 3, party: 2 }, comments: [] },
    { coords: [60.1850, 24.8280], title: 'Puistokonsertti @ Kaivopuisto', description: 'Avoin konsertti puistossa lauantaina.', reactions: { heartEyes: 4, clap: 2 }, comments: [] },
    { coords: [60.1921, 24.9458], title: 'Kirpputori @ Kallio', description: 'Suuri kirpputori Kallion sydämessä.', reactions: { moneyBag: 6, shoppingBags: 3 }, comments: [] },
    { coords: [60.2055, 24.6559], title: 'Rantabileet @ Lauttasaari', description: 'Kesäiset rantabileet Lauttasaaressa.', reactions: { beach: 7, cocktail: 5 }, comments: [] },
    { coords: [60.1692, 24.9402], title: 'Kahvifestivaalit @ Töölö', description: 'Kahvin ystävien festivaali Töölössä.', reactions: { coffee: 8, heartEyes: 6 }, comments: [] },
    { coords: [60.1619, 24.9286], title: 'Elokuvailta @ Kamppi', description: 'Ulkoilmaelokuvailta Kampin keskuspuistossa.', reactions: { clapperBoard: 4, popcorn: 3 }, comments: [] }
];

app.get('/', (req, res) => {
    res.render('index', { events });
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/api/events', (req, res) => {
    res.json(events);
});

app.post('/api/events', (req, res) => {
    const { title, description, coords } = req.body;
    events.push({ title, description, coords, reactions: {}, comments: [] });
    res.status(201).send();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
