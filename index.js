var core    = require('./core');

core.data.connect().then((db) => {

    console.log("DB connected.");
    
    return core.data.new_collection({
        "messages":{},
        "users":{}
    });
})
.then((r) => {
    if(r)
        { console.log("messages collection created"); }
    
    console.log("collections available:",core.data.collections);

    return core.server.start();
})
.then(() => {

    console.log("Server Ready");
});
