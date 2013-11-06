module.exports = {
    mongo: {
        dbUrl: 'https://api.mongolab.com/api/1',            // The base url of the MongoLab DB server
        apiKey: '4fb51e55e4b02e56a67b0b66'                 // Our MongoLab API key
    },
    security: {
        dbName: 'ascrum',                                   // The name of database that contains the security information
        usersCollection: 'users'                            // The name of the collection contains user information
    },
    server: {
        listenPort: 3000
    }
};