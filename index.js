var core    = require('./core');

core.data.connect().then((db) => {

    console.log("database connected..");

    core.data.new_collection("messages",{}).then((r) => {
        if(r)
        {
            console.log("new collection added");
        }
        console.log("current collections, ",core.data.collections);
        
        core.server.start().then(() => {
            console.log("Server Ready.");
        });
    
    });



});

