const db = require('../sql/connect');

function queryElements() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM elements', (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    })
};

module.exports = {
    queryElements
}
