require('dotenv').config({path:'.env'})
const express = require('express');
const axios = require('axios');
const { request } = require('express');

const app = express();

const API_KEY = process.env['API_TOKEN'];
let contactsToDeleteById = [];

app.get('/api/contacts', async (req, res) => {
    const contacts = `https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey=${API_KEY}`;
    try{
        const resp = await axios.get(contacts);
        const data = resp.data;
        res.status(200).json(data);

        const filteredData = data.contacts.filter(contact => {
            const contactsToDelete = contact.vid === 1;
            return contactsToDelete
        })
        
        const deleteContacts = filteredData;
        deleteContacts.map(contact =>{
            contactsToDeleteById.push(contact.vid)
        })
    }catch(err){
        console.error(err)
    }
});

 app.delete('/api/contacts/:id', (req, res) => {
    const id = req.params.id;


    const deleted = contactsToDeleteById.find(contact => contact.vid === id)
    res.status(200).json(deleted)
   
    if(deleted){
        console.log(deleted)
        contactsToDeleteById = contactsToDeleteById.filter(contact => contact.vid != id)
    }else{
        res.status(404).json({message: "Contact does not exist."})
    }
})
app.listen(3000, () => console.log('Listening on http://localhost:3000'))


 //   contactEmails.push(data.contacts;
        // for( let i = 0; i <  filteredContactsToDelete.length; i++){
        //     const contactId = filteredContactsToDelete[i].vid;
        //     const deleteContactByIdUrl = `https://api.hubapi.com/contacts/v1/contact/vid/${contactId}?hapikey=${API_KEY}`
        //     console.log(deleteContactByIdUrl)
        // }