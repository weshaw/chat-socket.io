const MongoClient   = require('mongodb').MongoClient;
const assert        = require('assert');

module.exports = function(m)
{
    this.dbname = "chat";
    this.dbhost = "mongodb://localhost:27017";

    this.client = MongoClient;
    this.db     = false;

    this.client.connect(this.dbhost, (err, client) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
      
        this.db = client.db(this.dbname);
      
        client.close();
    });
};