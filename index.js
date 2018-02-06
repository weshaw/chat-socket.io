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

    return Promise.all([
        core.messages.init(),
        core.server.start()
    ]);
})
.then(() => {

    console.log("Server Ready");
});
