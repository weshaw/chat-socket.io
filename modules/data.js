const MongoClient   = require('mongodb').MongoClient;
const assert        = require('assert');

module.exports = function(m)
{
    this.dbname         = "chat";
    this.dbhost         = "mongodb://localhost:27017";
    this.dboptions      = {
        reconnectTries : Number.MAX_VALUE,
        autoReconnect : true
    };  
    this.db             = false;
    this.client         = MongoClient;
    this.collections    = [];
    this.connection     = false;

    this.connect = function()
    {
        return new Promise((resolve,reject) => {
            this.collections = [];
            this.client.connect(this.dbhost, this.dboptions, (err, client) => {
                if(err)
                {
                    reject(err);
                    return false;
                }
                this.connection = client;

                this.db = this.connection.db(this.dbname);
                this.db.listCollections().toArray((err, collections) => {
                    if (err) 
                        {  console.log(err); return false; }
                    this.collections = [];
                    for(let i=0,l=collections.length;i<l;i++)
                    {
                        this.collections.push(collections[i].name);
                    }
                });
                resolve(this.db);
            });
        });
    };
    this.disconnect = function()
    {
        if(this.connection)
        {
            this.connection.close();
        }
    };
    this.has_collection = function(name){
        return this.collections.indexOf(name) >= 0;
    };

    this.new_collection = function(name,options)
    {
        // create many:
        if(typeof name == "object")
        {
            let p = [];
            for (const n in name) {
                let o = name[n];
                p.push(this.new_collection(n,o));
            }
            return Promise.all(p);
        }
        // create one:
        return new Promise((resolve,reject) => {
            if(this.has_collection(name))
            {
                resolve(false);
            }
            else
            {
                this.db.createCollection(name,options,(err, results) => {
                    if (err) 
                    {
                        reject(err);
                        return false;
                    }
                    this.collections.push(name);
                    resolve(results);
                });

            }
        });
    };
    this.set = function(collection,data)
    {
        return new Promise((resolve,reject) => {
            
        });
    };

    return this;
};