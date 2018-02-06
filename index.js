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
        { console.log("collections created"); }
    
    console.log("collections available:",core.data.collections);

    return core.messages.load_existing();
})
.then(() => {

    console.log("Load DB Data");
    return core.server.start();
})
.then(() => {

    console.log("Server Ready");
});
