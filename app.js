require('dotenv').config({path:'/.env'})
const express = require('express');
const axios = require('axios');

const app = express();

const API_KEY = process.env['API_TOKEN'];

app.get('/contacts', (req, res) => {

});

app.listen(3000, () => console.log('Listening on http://localhost:3000'))