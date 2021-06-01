require('dotenv').config({path:'.env'})
const express = require('express');
const axios = require('axios');

const app = express();

const API_KEY = process.env['API_TOKEN'];

app.get('/contacts', async (req, res) => {
    const contacts = `https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey=${API_KEY}`;
    try{
        const resp = await axios.get(contacts);
        const data = resp.data;
        res.json(data);
    }catch(err){
        console.error(err)
    }
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'))