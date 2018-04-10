const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.use(bodyParser.json());

// Db config
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
    .then(() => {
        console.log('Application connected to database');
    })
    .catch(err => {
        console.log('Error connecting database');
        process.exit();

    })

app.get('/', (req,res) => {
    res.json({message : 'My first message'});
});

require('./app/routes/notes.routes')(app);

app.listen(3000, () => {
    console.log('Listening to port 3000');
});
