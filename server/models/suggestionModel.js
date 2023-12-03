const dbConnection = require('./db');

const getScenarios = (action) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM scenario_mappings WHERE FIND_IN_SET(?, action) > 0';

        dbConnection.query(query, [action], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getScenarios
};