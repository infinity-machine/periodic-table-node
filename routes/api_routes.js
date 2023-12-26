const fs = require('fs');
const api_router = require('express').Router();

const { queryElements } = require('../controllers/api_controllers')

api_router.get('/elements', async (req, res) => {
    fs.readFile('data/pt.json', 'utf-8', (error, data) => {
        if (error) return console.log(error);
        res.send(data)
    });
    // const elements = await queryElements();
    // console.log(elements.length)
    // res.send(elements)
})

module.exports = api_router