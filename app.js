require('dotenv').config({path:'.env'})
const express = require('express');
const axios = require('axios');

const app = express();

const API_KEY = process.env['API_TOKEN'];

const getAllContacts = async () => {
      //DONE:> while 'has more' is true then request the next 100 contacts based on the vid offset
    let hasMOre = false;
    let vidOffset = undefined;
    let allContacts = [];

    do {
        const resp = await axios.get('https://api.hubapi.com/contacts/v1/lists/all/contacts/all', {
          params: {
              count: 100, //limits 100
              vidOffset: vidOffset,
              hapikey: API_KEY,
              //property: the two props that hold deletion criteria
          }  
        })
       
        const { contacts, 'has-more': _hasMore, 'vid-offset': _vidOffset } = resp.data; //rest & spread
        allContacts.push(...contacts);
        hasMOre = _hasMore;
        vidOffset = _vidOffset;
    } while (hasMOre  === true)
    return allContacts;
}

const deleteContact = async (contact) => {
    await axios.delete(`https://api.hubapi.com/contacts/v1/contact/vid/${contact.vid}`, {
          params: {
              hapikey: API_KEY,
          }  
        })
}

 app.delete('/api/inactive_contacts/', async (req, res) => {
    const allContacts = await getAllContacts();
    //filter sync status && last activity date
    const filteredContacts = allContacts.filter(contact => contact.vid === 1 ) //get actual filter details 
    //delete filtered contacts 'batch delete'
    for (let contact of filteredContacts) {
        await deleteContact(contact);
    }
    res.sendStatus(200);
})

app.listen(3000, () => console.log('Listening on http://localhost:3000'))