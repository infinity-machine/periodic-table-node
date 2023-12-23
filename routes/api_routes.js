const api_router = require('express').Router();

const { queryElements } = require('../controllers/api_controllers')

api_router.get('/elements', async (req, res) => {
    const elements = await queryElements();
    res.send(elements)
})

module.exports = api_router