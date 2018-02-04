var shortid = require('shortid');
module.exports = function(m)
{
    this.ids    = [];
    this.data   = {};

    this.is_user = function(socket_id,id)
        { return this.ids[id] == socket_id; };
    
    this.get_data = function(id)
        { return this.data[id] || false; };
    
    this.set_data = function(id,name,value)
    {
        if(!this.data[id])
            { return false; }
        this.data[id][name] = value;
        return true;
    };

    this.new_id = function()
        { return shortid.generate(); };

    this.set_user = function(socket_id,id)
    {
        id = id||this.new_id();
        this.ids[id] = socket_id;
        console.log("Linking: ",id,socket_id);
        return id;
    };

    this.socket_id_to_id = function(socket_id)
    {
        let match = false;
        for( let id in this.ids)
        {
            if(this.ids[id] == socket_id)
            {
                match = id;
                break;
            }
        }
        return match;
    };

    this.setup_user = function(id)
    {
        let ret = {};
        ret.id = id;
        ret.name = 'user';
        if(this.data[id])
        {
            for (var key in this.data[id]) {
                if (this.data[id].hasOwnProperty(key)) {
                    ret[key] = this.data[id][key];
                }
            }
        }
        else
        {
            this.data[id] = {};
        }
        return ret;
    };

    this.disconnect = function(id)
    {
        console.log("user left:",this.get_data(id));
    };

    return this;
};