const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let events = [
    { id: 1, coords: [60.1699, 24.9384], title: 'Katujuhlat @ Helsinki', description: 'Pienimuotoiset juhlat Helsingin keskustassa.', reactions: { smile: 5, thumbsUp: 3, party: 2 }, comments: [{author: "Ano Nyymi", text:"Onko tämä vielä saatavilla? AV YV"}, {author: "Ano Nyymi", text:"Tulen paikalle, jos siellä on ilmaisia munkkeja."}, {author: "Ano Nyymi", text:"Voiko sinne tuoda koiran?"}] },
    { id: 2, coords: [60.1850, 24.8280], title: 'Puistokonsertti @ Kaivopuisto', description: 'Avoin konsertti puistossa lauantaina.', reactions: { heartEyes: 4, clap: 2 }, comments: [{author: "Ano Nyymi", text:"Onko siellä karaokea?"}, {author: "Ano Nyymi", text:"Toivottavasti sää suosii!"}, {author: "Ano Nyymi", text:"Voinko tuoda oman kitaran?"}] },
    { id: 3, coords: [60.1921, 24.9458], title: 'Kirpputori @ Kallio', description: 'Suuri kirpputori Kallion sydämessä.', reactions: { moneyBag: 6, shoppingBags: 3 }, comments: [{author: "Ano Nyymi", text:"Onko siellä myynnissä vanhoja vinyylejä?"}, {author: "Ano Nyymi", text:"Etsin antiikkisia kahvikuppeja, löytyykö?"}, {author: "Ano Nyymi", text:"Voiko siellä maksaa kortilla?"}] },
    { id: 4, coords: [60.2055, 24.6559], title: 'Rantabileet @ Lauttasaari', description: 'Kesäiset rantabileet Lauttasaaressa.', reactions: { beach: 7, cocktail: 5 }, comments: [{author: "Ano Nyymi", text:"Onko siellä rantapalloja?"}, {author: "Ano Nyymi", text:"Mitä juomia on tarjolla?"}, {author: "Ano Nyymi", text:"Voiko siellä grillata?"}] },
    { id: 5, coords: [60.1692, 24.9402], title: 'Kahvifestivaalit @ Töölö', description: 'Kahvin ystävien festivaali Töölössä.', reactions: { coffee: 8, heartEyes: 6 }, comments: [{author: "Ano Nyymi", text:"Onko siellä erikoiskahveja?"}, {author: "Ano Nyymi", text:"Voiko siellä maistaa uusia makuja?"}, {author: "Ano Nyymi", text:"Onko siellä kahvinvalmistusnäytöksiä?"}] },
    { id: 6, coords: [60.1619, 24.9286], title: 'Elokuvailta @ Kamppi', description: 'Ulkoilmaelokuvailta Kampin keskuspuistossa.', reactions: { clapperBoard: 4, popcorn: 3 }, comments: [{author: "Ano Nyymi", text:"Mitä elokuvia näytetään?"}, {author: "Ano Nyymi", text:"Onko siellä popcornia?"}, {author: "Ano Nyymi", text:"Voiko tuoda oman viltin?"}] },
    { id: 7, coords: [60.1700, 24.9400], title: 'Sirkus @ Senaatintori', description: 'Hauska sirkusesitys Senaatintorilla.', reactions: { clown: 5, balloon: 3 }, comments: [{author: "Ano Nyymi", text:"Onko siellä pellejä?"}, {author: "Ano Nyymi", text:"Saako siellä ilmapalloja?"}, {author: "Ano Nyymi", text:"Onko siellä trapetsitaiteilijoita?"}] },
    { id: 8, coords: [60.1800, 24.9500], title: 'Joogafestivaali @ Seurasaari', description: 'Rentouttava joogafestivaali Seurasaaressa.', reactions: { lotus: 4, om: 2 }, comments: [{author: "Ano Nyymi", text:"Onko siellä aloittelijoille sopivia tunteja?"}, {author: "Ano Nyymi", text:"Voiko siellä meditoida?"}, {author: "Ano Nyymi", text:"Tarvitaanko oma matto?"}] },
    { id: 9, coords: [60.1900, 24.9600], title: 'Koiranäyttely @ Töölönlahti', description: 'Koiranäyttely Töölönlahden puistossa.', reactions: { dog: 6, bone: 3 }, comments: [{author: "Ano Nyymi", text:"Voiko sinne tuoda oman koiran?"}, {author: "Ano Nyymi", text:"Onko siellä koirien temppurata?"}, {author: "Ano Nyymi", text:"Saako siellä koiranherkkuja?"}] },
    { id: 10, coords: [60.2000, 24.9700], title: 'Tanssifestivaali @ Esplanadi', description: 'Tanssifestivaali Esplanadin puistossa.', reactions: { dancer: 7, music: 5 }, comments: [{author: "Ano Nyymi", text:"Onko siellä tanssityöpajoja?"}, {author: "Ano Nyymi", text:"Mitä musiikkia siellä soitetaan?"}, {author: "Ano Nyymi", text:"Voiko siellä osallistua tanssikilpailuun?"}] },
    { id: 11, coords: [60.2100, 24.9800], title: 'Kirjallisuusfestivaali @ Kumpula', description: 'Kirjallisuusfestivaali Kumpulan kasvitieteellisessä puutarhassa.', reactions: { book: 8, pen: 6 }, comments: [{author: "Ano Nyymi", text:"Onko siellä kirjailijavieraita?"}, {author: "Ano Nyymi", text:"Voiko siellä ostaa kirjoja?"}, {author: "Ano Nyymi", text:"Onko siellä runonlausuntaa?"}] }
];

let messages = [];

app.get('/', (req, res) => {
    res.render('index', { events });
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/event/:id', (req, res) => {
    const event = events.find(e => e.id == req.params.id);
    if (event) {
        res.json(event);
    } else {
        res.status(404).send('Event not found');
    }
});

app.get('/api/events', (req, res) => {
    res.json(events);
});

app.post('/api/events', (req, res) => {
    const { title, description, coords, date, time } = req.body;
    const id = events.length + 1;
    events.push({ id, title, description, coords, date, time, reactions: {}, comments: [] });
    res.status(201).send();
});

app.post('/event/:id/react', (req, res) => {
    const event = events.find(e => e.id == req.params.id);
    if (event) {
        const { reaction } = req.body;
        if (event.reactions[reaction] !== undefined) {
            event.reactions[reaction]++;
        } else {
            event.reactions[reaction] = 1;
        }
        res.json(event);
    } else {
        res.status(404).send('Event not found');
    }
});

app.get('/box', (req, res) => {
    res.render('box', { messages });
});

app.post('/api/messages', (req, res) => {
    const { author, text } = req.body;
    messages.push({ author, text });
    res.status(201).send();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
