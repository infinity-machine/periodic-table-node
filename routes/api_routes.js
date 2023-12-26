const api_router = require('express').Router();

const { queryElements, searchElement } = require('../controllers/api_controllers');

api_router.get('/elements', async (req, res) => {
    const elements = await queryElements();
    res.send(elements);
});

api_router.get('/element/:pt_number', async(req, res) => {
    const element_number = parseInt(req.params.pt_number);
    if(!element_number) return false;
    if(
        element_number < 1 || element_number > 118
    ) return false;
    const element = await searchElement(element_number);
    res.json(element[0]);
});

module.exports = api_router;