var app     = require('express')();
var http    = require('http').Server(app);
module.exports = function(m)
{    
    this.app    = app;
    this.http   = http;
    this.port   = 3000;

    this.start = function(){
        console.log("WS RUNNING");
        return new Promise((resolve, reject) => {
            this.http.listen(this.port, () => {
                console.log('listening on *:'+this.port);
                resolve(this.http);
            });
        });
    };

    this.app.get('/', (req, res) => {
        res.sendFile(__basedir  + '/pages/index.html');
    });
    this.app.get('/:page', (req, res) => {
        res.sendFile(__basedir  + '/pages/'+req.params.page+'.html',function(err){
            if(err)
            {
                res.sendStatus(404);
            }
        });
    });


    return this;
};
