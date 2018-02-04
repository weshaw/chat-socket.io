var socket      = require('socket.io');
module.exports = function(m)
{    
    this.io     = socket(m.server.http);

    this.io.on('connection', (socket) => {
        console.log('a user connected',socket.id);
        this.new_connection(socket);
        this.io.to(socket.id).emit('messages',m.messages.get());
    });


    this.new_connection = function(socket)
    {
        socket.on('setup',(id) => {
            id = m.users.set_user(socket.id,id);
            let setup_user = m.users.setup_user(id)
            this.io.to(socket.id).emit('setup',setup_user);            
        });
        socket.on('chat message',(msg) => {
            if(m.users.is_user(socket.id,msg.id))
            {
                let ud = m.users.get_data(msg.id);
                if(msg.name != ud.name)
                {
                    console.log("name change: ",ud.name||'user','to '+msg.name);
                    m.users.set_data(msg.id,"name",msg.name);
                }
                console.log(msg);
                msg.time = Math.round(new Date().getTime()/1000);
                m.messages.set(msg);
                this.io.emit('chat message',msg);
            }
        });
        socket.on('disconnect',() => {
            let id = m.users.socket_id_to_id(socket.id);
            m.users.disconnect(id);
        });
    };


    return this;
};
