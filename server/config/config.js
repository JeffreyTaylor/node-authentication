var secret = require('../secret');
// above file is not checked into source control
// if missing ./secret, create a secret.js file in the server folder
// and define exports.variable-you-are-missing


module.exports = {
    mongo: {
        dbLocal: secret.mongoUrl
    },
    server: {
        listenPort: 3000
    }
};