const db = require('../sql/connect');

function queryElements() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM elements', (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

function searchElement(pt_number) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM elements WHERE number = ${pt_number}`, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

module.exports = {
    queryElements, searchElement
};
