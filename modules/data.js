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

    this.collection = function(collection)
    {
        console.log(collection);
        return new Promise((resolve,reject) => {
            this.db.collection(collection,(err, col)=>{
                if(err)
                    { reject(err); return; }
                resolve(col);
            });
        });
    };

    this.insert = function(collection,data={})
    {
        return this.collection(collection)
            .then((col) => { return new Promise((resolve,reject) => {
                col.insert(data,(err,res) => {
                    if(err)  { reject(err); return; }
                    resolve(res);
                });
            }) },(err) => console.error(err));
    };
    
    this.find = function(collection,data = {},sort = false)
    {
        return this.collection(collection)
            .then((col) => { return new Promise((resolve,reject) => {
                let cursor = col.find(data);
                if(sort)
                {
                    cursor.sort(sort);
                }
                cursor.toArray((err,res) => {
                    if(err) { reject(err); return; }
                    resolve(res);
                });
            }) },(err) => console.error(err));
    };

    this.update = function(
        collection,
        likethis = {},
        tothis = {},
        options = { multi:true }
    ){
        return this.collection(collection)
            .then((col) => { return new Promise((resolve,reject) => {
                if(err) { reject(err); return; }
                col.update(likethis,tothis,{multi:true},(err) => {
                    if(err) { reject(err); return; }
                    resolve();
                });
            }) },(err) => console.error(err));
    };

    return this;
};